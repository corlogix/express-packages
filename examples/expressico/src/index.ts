import expressico, { defineConfig } from "expressico";
import controllers from './controllers';

const config = defineConfig({
  debug: true,
  controllers
})

expressico.start(config);