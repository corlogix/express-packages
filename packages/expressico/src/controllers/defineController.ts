import { Router } from 'express';
import { ControlledRoute, ControllerOptions, Controller, ControllerContext } from './types';
import { sanitizePath } from '../utils';

const defaultOptions: ControllerOptions = {
  path: '/'
};

export function defineController(routes?: ControlledRoute[], options?: ControllerOptions): Controller;
export function defineController(options?: ControllerOptions): Controller;
export function defineController(a?: any, b?: any): Controller {
  const routes: ControlledRoute[] = Array.isArray(a) ? a : [];
  let options: ControllerOptions = Array.isArray(a) ? b : a;

  options = options
    ? { ...defaultOptions, ...options }
    : defaultOptions

  options.path = `${sanitizePath(options.path)}`;

  const context: ControllerContext = [...routes];

  return {
    add: (...routes: ControlledRoute[]) => {
      for (const route of routes) {
        if(!route.path) {
          route.path = options.path;
        } else {
          route.path = `${options.path}${sanitizePath(route.path)}`;
        }
        
        context.push(route);
      }
    },
    _export: (router: Router): void => {
      for (const key in context) {
        const route = context[key];
        const handlers: any[] = [ ];
        if (route.before && route.before.length > 0) {
          handlers.push(...route.before);
        }
        handlers.push(route.handler);
  
        if (!route.method) {
          route.method = 'get';
        }
  
        if (!route.path) route.path = '';
  
        if (router[route.method]) {
          router[route.method](route.path, handlers)
        }
      }
    }
  };
}