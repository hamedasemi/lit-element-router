import { LitElement } from 'lit-element';

interface Unauthenticated {
    name: string;
}

interface Unauthorized {
    name: string;
}

interface Authentication {
    authenticate(): Observable<boolean> | Promise<boolean> | boolean;
    unauthenticated: Unauthenticated;
}

interface Authorization {
    authorize(): Observable<boolean> | Promise<boolean> | boolean;
    unauthorized: Unauthorized;
}

interface Route {
    name?: string;
    pattern?: string;
    data?: object;
    callback?(route: string, params: object, query: object, data: object): void;
    authentication?: Authentication;
    authorization?: Authorization;
}

interface Routes extends Array<Route> { }

export const routerMixin = (superclass: typeof LitElement) => class RouterMixin extends superclass {
    static routes: Routes;
    protected router(route?: string, params?: object, query?: object, data?: object): void;
    private routed(name?: string, params?: object, query?: object, data?: object, callback?: (route?: string, params?: object, query?: object, data?: object) => void, localCallback?: (route?: string, params?: object, query?: object, data?: object) => void): void;
    private routing(routes: Routes, callback: (route: string, params: object, query: object, data: object) => void): void;
}

export const navigateMixin = (superclass: typeof LitElement) => class NavigateMixin extends superclass {
    protected navigate(href: string): void;
}

export const outletMixin = (superclass: typeof LitElement) => class OutletMixin extends superclass {
    private outlet(): void;
}

// export declare class Router {
//     static routes: Routes;
//     protected router(route?: string, params?: object, query?: object, data?: object): void;
//     private routing(routes: Routes, callback: (route: string, params: object, query: object, data: object) => void): void;
// }

// export declare function routerMixin<T extends typeof HTMLElement>(base: T): T & Router

// type Constructor<T = HTMLElement> = new (...args: any[]) => T;
