import chalk from 'chalk';
import { Express, RequestHandler, Router } from 'express';

export type RouterHandler<T = any> = (props?: T) => Router 

export type ExpressicoMiddleware<PROPS = any> = {
  name: string;
  handler: RequestHandler;
  routerHandler?: RouterHandler<PROPS>;
  customHandler?: (props: PROPS) => void;
  props?: PROPS;
}

export const defineMiddleware = <T = any>(consumable: ExpressicoMiddleware<T>): ExpressicoMiddleware<T> => consumable;

export function consumeMiddleware(app: Express, consumables: ExpressicoMiddleware[]) {
  console.log(chalk`{yellowBright.bold Loading middleware...}`);
  for (const { name, handler, routerHandler, customHandler, props } of consumables) {
    console.log(chalk`  {white loading ${name}...}`)
    if(typeof handler === "function") {
      app.use(handler);
    } else if(typeof routerHandler === "function") {
      app.use(routerHandler(props));
    } else if (typeof customHandler === "function") {
      customHandler(props);
    } else {
      console.error(chalk`{red.bold Middleware '${name}' was loaded without a handler }`);
      process.exit(1)
    }
      
  }
  console.log()
}