import { Express } from "express";
import configure from '../configure';
import useControllers from './controllers';
import { enforceHttps } from './https';
import { allowLocalhostCors } from './localhost';
import { parseJsonRequests } from './parse';
import { useStatic } from './public';
import { handleOptionRequests } from './request';
import { compressResponses, createHelfullResponses } from './response';

export default function middleware(app: Express) {
  configure?.middleware && configure.middleware.forEach(handler => {
    app.use(handler);
  });

  app.use(allowLocalhostCors);

  app.use(enforceHttps);

  app.use(handleOptionRequests);

  app.use(createHelfullResponses);

  app.use(parseJsonRequests);
  app.use(compressResponses);

  app.use(parseJsonRequests());

  app.use(useControllers(configure?.controllers || [], true))

  app.use(useStatic());
  app.use("/**", useStatic());  
};