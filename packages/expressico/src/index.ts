import chalk from 'chalk';
import express from 'express';
import configure, { ExpressicoConfiguration } from './configure';
import middleware from './middleware';
import { BANNER } from './utils/banner';

export { defineConfig } from "./configure";

export * from "./controllers";


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
    console.log(BANNER());
    
    if(config) {
      configure.loadConfig(config);
      console.log("configuration loaded", "::", {...configure})
      console.log();
    }


    const app = express();
    
    middleware(app);
    
    const port = 8080;

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