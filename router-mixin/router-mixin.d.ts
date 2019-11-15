import { LitElement } from 'lit-element'

interface Route {
    name?: string;
    pattern?: string;
    data?: object;
    callback?(route: string, params: object, query: object, data: object): void;
    guard?(): Observable<boolean> | Promise<boolean> | boolean;
}

interface Routes extends Array<Route>{}

export const routerMixin = (superclass: typeof LitElement) => class RouterMixin extends superclass {
    static routes: Routes;
    protected router(route?: string, params?: object, query?: object, data?: object): void;
    private routing(routes: Routes, callback: (route: string, params: object, query: object, data: object) => void): void;
}

export const linkMixin = (superclass: typeof LitElement) => class LinkMixin extends superclass {
    protected navigate(href: string): void;
}

export const outletMixin = (superclass: typeof LitElement) => class OutletMixin extends superclass {
    private outlet(): void;
}
