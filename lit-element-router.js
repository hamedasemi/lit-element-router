import { parseParams, parseQuery, testRoute } from "./utility/router-utility";

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
    }

    connectedCallback(...args) {
      super.connectedCallback(...args);

      // @ts-ignore
      this.routing(this.constructor.routes, (...args) => this.router(...args));
      window.addEventListener("route", () => {
        // @ts-ignore
        this.routing(this.constructor.routes, (...args) =>
          this.router(...args)
        );
      });

      window.onpopstate = () => {
        window.dispatchEvent(new CustomEvent("route"));
      };
    }

    routed(name, params, query, data, callback, localCallback) {
      localCallback && localCallback(name, params, query, data);
      callback(name, params, query, data);
    }

    routing(routes, callback) {
      this.canceled = true;

      // const uri = decodeURIComponent(window.location.pathname);
      const uri = window.location.pathname;
      const querystring = decodeURIComponent(window.location.search);

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
      window.history.pushState({}, null, href);
      window.dispatchEvent(new CustomEvent("route"));
    }
  };
}

export function outlet(base) {
  return class extends base {
    static get properties() {
      return {
        activeRoute: { type: String, reflect: true, attribute: "active-route" }
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

    moveChildNodes(node, tagName = "template") {
      const template = document.createElement(tagName);
      for (const attr of node.attributes) {
        template.setAttribute(attr.name, attr.value);
      }
      while (node.childNodes.length > 0) {
        template.appendChild(node.childNodes[0]);
      }
      return template;
    }

    outlet() {
      const nodeCache = {};
      Array.from(this.querySelectorAll(`[route]`)).map((active) => {
        const name = active.getAttribute("route");
        const template = nodeCache[name] || this.moveChildNodes(active);
        nodeCache[name] = template;
        // replace route by template
        active.replaceWith(template);
      });
      if (this.shadowRoot) {
        Array.from(this.shadowRoot.querySelectorAll(`[route]`)).map(
          (active) => {
            const name = active.getAttribute("route");
            const template = nodeCache[name] || this.moveChildNodes(active);
            nodeCache[name] = template;

            // replace route by template
            active.replaceWith(template);
          }
        );
      }
      if (this.activeRoute) {
        Array.from(this.querySelectorAll(`[route~=${this.activeRoute}]`)).map(
          (active) => {
            const name = active.getAttribute("route");
            const template = nodeCache[name];
            const dom = this.moveChildNodes(template, "div");
            active.replaceWith(dom);
          }
        );
        if (this.shadowRoot) {
          Array.from(
            this.shadowRoot.querySelectorAll(`[route~=${this.activeRoute}]`)
          ).map((active) => {
            const name = active.getAttribute("route");
            const template = nodeCache[name];
            const dom = this.moveChildNodes(template, "div");
            active.replaceWith(dom);
          });
        }
      }
    }
  };
}
