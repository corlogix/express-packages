import chalk from 'chalk';
import express from 'express';
import context, { ExpressicoConfiguration } from './context';
import middleware from './middleware';
import { BANNER } from './utils/banner';

export { defineConfig } from "./context";

export * from "./controllers";
export * from "./middleware";

declare global {
  namespace Express {
    interface Response {
      ok(json): void;
      fail(status: number, msg: string): void;
    }
  }
}

export default {
  start: function(config?: ExpressicoConfiguration) {
    const app = express();
    context.setApp(app);

    console.log(BANNER());
    
    if(config) {
      context.loadConfig(config);
      console.log("configuration loaded", "::", {...context, _app: "initialized"})
      console.log();
    }


    middleware(app);
    
    const port = context?.port || 8080;

    const server = app.listen(port, () => {
      console.info(
        chalk`{green.bold Server started} {white (port: ${port})} {grey (/dist/public/)}`,
      );
    });
    

    process.on('SIGINT', function () {
      console.info('\nGracefully shutting down from SIGINT (Ctrl+C)');
      server.close();
      process.exit(1);
    });
  
    process.on('uncaughtException', function(ex) {
      console.info('*** uncaughtException:', ex);
    });
  
    process.on('unhandledRejection', function(err: any) {
      console.info('UNHANDLED REJECTION! 💥 Shutting down...');
      console.info(err);
      process.exit(1);
    });

    return app;
  }
};