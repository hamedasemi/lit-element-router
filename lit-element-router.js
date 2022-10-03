import { parseParams, parseQuery, testRoute } from "./utility/router-utility";
export { RouterLink } from "./RouterLink.js";
export { RouterView } from "./RouterView.js";

let __mode = "history"; // 默认history，支持hash
let __routes = [];

export function router(base) {
  return class extends base {
    static get properties() {
      return {
        route: { type: String, reflect: true, attribute: "route" },
        canceled: { type: Boolean },
      };
    }

    constructor(...args) {
      super(...args);
      this.route = "";
      this.canceled = false;
      // 兼容旧规则
      const _routerConfig = this.constructor?.routes;
      if (_routerConfig) {
        if (Array.isArray(_routerConfig)) {
          this.routes = _routerConfig;
        } else {
          const { routes, mode } = _routerConfig;
          mode && (__mode = mode);
          routes && (__routes = routes);
        }
      }
    }

    connectedCallback(...args) {
      super.connectedCallback(...args);

      // @ts-ignore
      this.routing(__routes, (...args) => this.router(...args));
      window.addEventListener("route", () => {
        // @ts-ignore
        this.routing(__routes, (...args) => this.router(...args));
      });

      // 根据模式适配监听类型
      const eventType = __mode === "hash" ? "hashchange" : "popstate";
      window.addEventListener(eventType, () => {
        window.dispatchEvent(new CustomEvent("route"));
      });
    }

    routed(name, params, query, data, callback, localCallback) {
      localCallback && localCallback(name, params, query, data);
      callback(name, params, query, data);
    }

    routing(routes, callback) {
      this.canceled = true;

      // 适配路径数据
      let { pathname, search, hash } = window.location;
      if (__mode === "hash" && hash) {
        const [_pathname, _search] = hash.split("?");
        pathname = _pathname.substring(1);
        search = _search || "";
      }

      const uri = decodeURI(pathname);
      const querystring = decodeURI(search);

      let notFoundRoute = routes.filter((route) => route.pattern === "*")[0];
      let activeRoute = routes.filter(
        (route) => route.pattern !== "*" && testRoute(uri, route.pattern)
      )[0];
      let query = parseQuery(querystring);

      if (activeRoute) {
        activeRoute.params = parseParams(activeRoute.pattern, uri);
        activeRoute.data = activeRoute.data || {};
        if (
          activeRoute.authentication &&
          activeRoute.authentication.authenticate &&
          typeof activeRoute.authentication.authenticate === "function"
        ) {
          this.canceled = false;
          Promise.resolve(
            activeRoute.authentication.authenticate.bind(this).call()
          ).then((authenticated) => {
            if (!this.canceled) {
              if (authenticated) {
                if (
                  activeRoute.authorization &&
                  activeRoute.authorization.authorize &&
                  typeof activeRoute.authorization.authorize === "function"
                ) {
                  this.canceled = false;
                  Promise.resolve(
                    activeRoute.authorization.authorize.bind(this).call()
                  ).then((authorizatied) => {
                    if (!this.canceled) {
                      if (authorizatied) {
                        this.routed(
                          activeRoute.name,
                          activeRoute.params,
                          query,
                          activeRoute.data,
                          callback,
                          activeRoute.callback
                        );
                      } else {
                        this.routed(
                          activeRoute.authorization.unauthorized.name,
                          activeRoute.params,
                          query,
                          activeRoute.data,
                          callback,
                          activeRoute.callback
                        );
                      }
                    }
                  });
                } else {
                  this.routed(
                    activeRoute.name,
                    activeRoute.params,
                    query,
                    activeRoute.data,
                    callback,
                    activeRoute.callback
                  );
                }
              } else {
                this.routed(
                  activeRoute.authentication.unauthenticated.name,
                  activeRoute.params,
                  query,
                  activeRoute.data,
                  callback,
                  activeRoute.callback
                );
              }
            }
          });
        } else if (
          activeRoute.authorization &&
          activeRoute.authorization.authorize &&
          typeof activeRoute.authorization.authorize === "function"
        ) {
          this.canceled = false;
          Promise.resolve(
            activeRoute.authorization.authorize.bind(this).call()
          ).then((authorizatied) => {
            if (!this.canceled) {
              if (authorizatied) {
                this.routed(
                  activeRoute.name,
                  activeRoute.params,
                  query,
                  activeRoute.data,
                  callback,
                  activeRoute.callback
                );
              } else {
                this.routed(
                  activeRoute.authorization.unauthorized.name,
                  activeRoute.params,
                  query,
                  activeRoute.data,
                  callback,
                  activeRoute.callback
                );
              }
            }
          });
        } else {
          this.routed(
            activeRoute.name,
            activeRoute.params,
            query,
            activeRoute.data,
            callback,
            activeRoute.callback
          );
        }
      } else if (notFoundRoute) {
        notFoundRoute.data = notFoundRoute.data || {};
        this.routed(
          notFoundRoute.name,
          {},
          query,
          notFoundRoute.data,
          callback,
          notFoundRoute.callback
        );
      }
    }
  };
}

export function navigator(base) {
  return class extends base {
    navigate(href) {
      //  支持hash模式
      if (__mode === "hash") {
        location.hash = href;
      } else {
        window.history.pushState({}, null, href);
      }
      window.dispatchEvent(new CustomEvent("route"));
    }
  };
}

export function outlet(base) {
  return class extends base {
    static get properties() {
      return {
        activeRoute: { type: String, reflect: true, attribute: "active-route" },
      };
    }

    attributeChangedCallback(...args) {
      super.attributeChangedCallback(...args);

      args.some((arg) => arg === "active-route") && this.outlet();
    }

    connectedCallback(...args) {
      super.connectedCallback(...args);

      setTimeout(() => {
        this.outlet();
      });
    }

    outlet() {
      Array.from(this.querySelectorAll(`[route]`)).map((active) => {
        active.style.display = "none";
      });

      this.shadowRoot &&
        Array.from(this.shadowRoot.querySelectorAll(`[route]`)).map(
          (active) => {
            active.style.display = "none";
          }
        );
      if (this.activeRoute) {
        Array.from(this.querySelectorAll(`[route~=${this.activeRoute}]`)).map(
          (active) => {
            active.style.display = "";
          }
        );
        this.shadowRoot &&
          Array.from(
            this.shadowRoot.querySelectorAll(`[route~=${this.activeRoute}]`)
          ).map((active) => {
            active.style.display = "";
          });
      }
    }
  };
}
