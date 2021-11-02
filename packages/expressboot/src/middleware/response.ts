import { RequestHandler } from 'express';
import compression from "compression";

declare global {
  namespace Express {
    interface Response {
      ok(json): void;
      fail(status: number, msg: string): void;
    }
  }
}

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

export const compressResponses = () => compression();