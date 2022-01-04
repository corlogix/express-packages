import chalk from 'chalk';
import express from 'express';
import path from 'path';
import { defineMiddleware } from './define';
import context from '../context'

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