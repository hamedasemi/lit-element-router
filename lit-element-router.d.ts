// import { LitElement } from 'lit-element';

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

export function router<TBase extends typeof HTMLElement>(base: TBase) {
    return class Router extends base<TBase> {
        static routes: Routes;
        protected router(route?: string, params?: object, query?: object, data?: object): void;
        private routed(name?: string, params?: object, query?: object, data?: object, callback?: (route?: string, params?: object, query?: object, data?: object) => void, localCallback?: (route?: string, params?: object, query?: object, data?: object) => void): void;
        private routing(routes: Routes, callback: (route: string, params: object, query: object, data: object) => void): void;
    }
}

// export function router() {
//     return function <TBase extends typeof HTMLElement>(base: TBase) {
//         return class Router extends base {
//             static routes: Routes;
//             protected router(route?: string, params?: object, query?: object, data?: object): void;
//             private routed(name?: string, params?: object, query?: object, data?: object, callback?: (route?: string, params?: object, query?: object, data?: object) => void, localCallback?: (route?: string, params?: object, query?: object, data?: object) => void): void;
//             private routing(routes: Routes, callback: (route: string, params: object, query: object, data: object) => void): void;
//         };
//     }
// }

export function navigator<TBase extends typeof HTMLElement>(base: TBase) {
    return class Navigator extends base<TBase> {
        protected navigate(href: string): void;
    }
}

// type Constructor<T = HTMLElement> = new (...args: any[]) => T;
// export declare function navigator<TBase extends typeof HTMLElement>(Base: TBase) {
//     return class navigator extends Base {
//         new(...args: any[]): {
//             protected navigate(href: string): void;
//         };
//         protected navigate(href: string): void;    }
// }



// import { LitElement } from "lit-element";
// declare type Constructor = new (...args: any[]) => HTMLElement;
// interface BeforeRenderMixin {
//     new(...args: any[]): {
//                      navigate(href: string): void;
//                 };
//     protected navigate(href: string): void;
// }
// declare type ReturnConstructor = new (...args: any[]) => HTMLElement & BeforeRenderMixin;
// export function navigator<B extends Constructor>(Base: B): B & ReturnConstructor;



// class Navigator {
//     new(...args: any[]): {
//         navigate(href: string): void;
//     };
//     protected navigate(href: string): void;
// }

// export declare function navigator<T extends typeof HTMLElement>(base: T): T & Navigator


export function outlet<TBase extends typeof HTMLElement>(base: TBase) {
    return class Outlet extends base<TBase> {
        private outlet(): void;
    }
}

// export const router = (superclass: typeof LitElement) => class Router extends superclass {
//     static routes: Routes;
//     protected router(route?: string, params?: object, query?: object, data?: object): void;
//     private routed(name?: string, params?: object, query?: object, data?: object, callback?: (route?: string, params?: object, query?: object, data?: object) => void, localCallback?: (route?: string, params?: object, query?: object, data?: object) => void): void;
//     private routing(routes: Routes, callback: (route: string, params: object, query: object, data: object) => void): void;
// }

// export const navigate = (superclass: typeof LitElement) => class Navigate extends superclass {
//     protected navigate(href: string): void;
// }

// export const outlet = (superclass: typeof LitElement) => class Outlet extends superclass {
//     private outlet(): void;
// }


// type Constructor<T = HTMLElement> = new (...args: any[]) => T;
// export declare function routerMixin<TBase extends typeof HTMLElement>(Base: TBase) {
//     return class RouterMixin extends Base {
//         new(...args: any[]): {
//         //     routes(): Routes;
//         };
//         // public static routes(): Routes;
//     }
// }


// export declare class Router {
//     static routes: Routes;
//     protected router(route?: string, params?: object, query?: object, data?: object): void;
//     private routing(routes: Routes, callback: (route: string, params: object, query: object, data: object) => void): void;
// }

// export declare function routerMixin<T extends typeof HTMLElement>(base: T): T & Router

// type Constructor<T = HTMLElement> = new (...args: any[]) => T;