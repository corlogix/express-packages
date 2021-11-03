import { RequestHandler } from 'express';
import { defineMiddleware } from './define';

export const createHelfullResponses: RequestHandler = (request, response, next) => {
  response.ok = (json) => {
    return response.json(json);
  };
  response.fail = (status, msg) => {
    return response.status(status).json({
      status,
      msg
    });
  };
  next();
}

export default defineMiddleware({
  name: "useHelpfulResponses",
  handler: (r, response, next) => {
    response.ok = (json) => {
      return response.json(json);
    };
    response.fail = (status, msg) => {
      return response.status(status).json({
        status,
        msg
      });
    };
    next();
  }
})