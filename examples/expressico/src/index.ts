import expressico, { defineConfig } from "expressico";
import controllers from './controllers';

const config = defineConfig({
  debug: true,
  controllers,
  middleware: [
    function customMiddleware(request, response, next) {
      console.log(request.hostname)
      next();
    }
  ]
})

expressico.start(config);