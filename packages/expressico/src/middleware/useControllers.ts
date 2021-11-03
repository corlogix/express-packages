import chalk from 'chalk';
import express from 'express';
import { defineMiddleware } from '.';
import { Controller } from '../controllers/types'

type UseControllersProps = { controllers: Controller[], verbose?: boolean };

/**
 * @name useControllers
 * @description Expressico Routing middleware to register all controlled routes under one express.Router
 * @param {Array<Controller>} controllers // array of route controllers
 * @param {boolean} verbose // logs out all registered routes
 * @returns {express.Router} router
 * @example
 * function() {
 *  const app = express();
 *  app.use(useControllers([]));
 * }
 */
export default function useControllers(props: UseControllersProps) {
  return defineMiddleware<UseControllersProps>({
    name: "useControllers",
    props,
    handler: null,
    routerHandler: ({ controllers, verbose }) => {
      const router = express.Router();
      
      for(const controller of controllers) {
        controller._export(router);
      }
    
      if(verbose) {
        console.log(chalk`    {cyan.bold Loading route controllers...}`);
        
        const toUpper = (str: string) => (str || "").toUpperCase(); 
    
        router.stack
          .forEach(
            ({route}) => console.log(chalk`      {whiteBright.bold ${Object.keys(route.methods).map(toUpper)}} {white ${route.path}}`)
          );
      
        console.log()
      }
    
      return router
    }
  })
}