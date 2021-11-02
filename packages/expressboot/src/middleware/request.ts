import { RequestHandler } from 'express';

export const handleOptionRequests = (): RequestHandler => (request, response, next) => {
  if ('OPTIONS' === request.method) {
    response.sendStatus(204);
  } else {
    next();
  }
};