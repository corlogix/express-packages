import { RequestHandler } from 'express';
import { Controller } from '../controllers';

export interface ExpressicoConfiguration {
  debug?: boolean;
  enforceHttps?: boolean;
  middleware?: RequestHandler[];
  controllers?: Controller[]
}

export class Configuration implements ExpressicoConfiguration {
  debug: ExpressicoConfiguration["debug"] = false;
  middleware: ExpressicoConfiguration["middleware"] = [];
  controllers: ExpressicoConfiguration["controllers"] = [];
  constructor() {
    
  }

  public loadConfig(config: ExpressicoConfiguration) {
    for (const key in config) {
      this[key] = config[key];
    }
  }
}

export function defineConfig(config: ExpressicoConfiguration) {
  return config;
}