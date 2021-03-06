import { defineMiddleware } from './define';

export default defineMiddleware({
  name: "useLocalhostCors",
  handler: (request, response, next) => {
    if(request.hostname && request.hostname === "localhost") {
      response.header('Access-Control-Allow-Origin', 'http://localhost:8080');
      response.header(
        'Access-Control-Allow-Headers',
        'X-Requested-With, Content-Type',
      );
      response.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, PURGE, HEAD, OPTIONS',
      );
    }
    next();
  }
})