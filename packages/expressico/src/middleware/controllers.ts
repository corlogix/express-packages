import chalk from 'chalk';
import express, { Router } from 'express';
import { Controller } from '../controllers/types'

/**
 * @name useControllers
 * @description Express.JS middleware to register all controlled routes under one express.Router
 * @param {Array<Controller>} controllers // array of route controllers
 * @param {boolean} verbose // logs out all registered routes
 * @returns {express.Router} router
 * @example
 * function() {
 *  const app = express();
 *  app.use(useControllers([]));
 * }
 */
export default function useControllers(controllers: Controller[], verbose?: boolean): Router {
  const router = express.Router();
  
  for(const controller of controllers) {
    controller._export(router);
  }

  if(verbose) {
    console.log(chalk`{yellowBright.bold Loading route controllers...}`);
    
    const toUpper = (str: string) => (str || "").toUpperCase(); 

    router.stack
      .forEach(
        ({route}) => console.log(chalk`  {whiteBright.bold ${Object.keys(route.methods).map(toUpper)}} {white ${route.path}}`)
      );
  
    console.log()
    console.log(chalk`{green.bold All controllers added to router!}`);
    console.log()
  }

  return router
}
