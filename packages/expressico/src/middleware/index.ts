import { Express, RequestHandler } from "express";
import configure from '../configure';
import useControllers from './controllers';
import { enforceHttps } from './https';
import { allowLocalhostCors } from './localhost';
import { parseJsonRequests } from './parse';
import { useStatic } from './public';
import { handleOptionRequests } from './request';
import { compressResponses, createHelfullResponses } from './response';

export const defineMiddleware = (handler: RequestHandler) => handler;

export {
  enforceHttps,
  allowLocalhostCors,
  parseJsonRequests,
  useStatic,
  handleOptionRequests,
  compressResponses,
  createHelfullResponses
}

export default function middleware(app: Express) {
  !!configure?.middleware?.length && configure.middleware.forEach(handler => {
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