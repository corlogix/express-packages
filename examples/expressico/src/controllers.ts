import { defineController } from 'expressico';

const controller = defineController({
  path: "/api/actuator"
});

controller.add({
  path: "/alive",
  handler: (r, response) => {
    response.ok("YES");
  }
});

export default [
  controller
]