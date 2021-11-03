import expressico, { defineConfig, defineMiddleware } from "expressico";
import controllers from './controllers';

const config = defineConfig({
  controllers,
  middleware: [
    defineMiddleware({
      name: "customMiddleware",
      handler: (request, r, next) => {
        console.log(request.hostname)
        next();
      } 
    })
  ]
})

expressico.start(config);