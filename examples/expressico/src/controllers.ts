import { createController } from 'expressico';

const controller = createController({
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