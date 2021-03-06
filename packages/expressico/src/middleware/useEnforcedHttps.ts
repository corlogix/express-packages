import { RequestHandler } from 'express';
import { defineMiddleware } from './define';

export default defineMiddleware({
  name: "useEnforceHttps",
  handler: (request, response, next) => {
    if(request.hostname && request.hostname !== "localhost") {
      if (!request.secure && request.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
        return response.redirect('https://' + request.get('host') + request.url);
      }
    }
    next();
  }
})
