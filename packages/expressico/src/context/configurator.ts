import { RequestHandler, Express } from 'express';
import { ExpressicoMiddleware } from '..';
import { Controller } from '../controllers';

export interface ExpressicoConfiguration {
  port?: number;
  enforceHttps?: boolean;
  middleware?: ExpressicoMiddleware[];
  controllers?: Controller[];
  staticPath?: string;
}

export class Configuration implements ExpressicoConfiguration {
  port: ExpressicoConfiguration["port"] = 8080;
  enforceHttps:  ExpressicoConfiguration["enforceHttps"] = true;
  middleware: ExpressicoConfiguration["middleware"] = [];
  controllers: ExpressicoConfiguration["controllers"] = [];
  staticPath: ExpressicoConfiguration["staticPath"] = "dist/public"; 

  _app: Express = null;
  constructor() {
    
  }

  public loadConfig(config: ExpressicoConfiguration) {
    for (const key in config) {
      this[key] = config[key];
    }
  }

  public setApp(app: Express) {
    this._app = app;
  }
  public getApp() {
    return this._app;
  }
}

export function defineConfig(config: ExpressicoConfiguration) {
  return config;
}