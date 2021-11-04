import chalk from 'chalk';
import express, {Express} from 'express';
import path from 'path';
import { defineMiddleware } from './define';
import context from '../context'


export const useStatic = (appp: Express) => {
  // app.use(express.static('dist/public'))
  // app.use("/**", express.static('dist/public'))
  // // return;
  const app = context.getApp();

  console.log(path.resolve("dist/public"))

  app.use("/**", express.static(path.resolve("dist/public")))
} 

export default defineMiddleware({
  name: "useStatic",
  handler: null,
  customHandler: () => {
    const app = context.getApp();
    const staticPath = path.resolve(context.staticPath);
    app.use("/**", express.static(staticPath));
    console.log(chalk`      {cyan Static files will be served from '${context.staticPath}'}`)
  }
})