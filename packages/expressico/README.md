# Expressico! [![Build](https://github.com/corlogix/express-packages/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/corlogix/express-packages/actions/workflows/build.yml) [![npm version](https://badge.fury.io/js/expressico.svg)](https://badge.fury.io/js/expressico)

`Expressico` is a Express.JS bootstrapper, it includes a versitile configuration that is simple and easy to use. This bootstrap package will help keep your codebase clean and modular for those pesky microservices that you keep copying the same code over and over again.

[Contributing & Development](../../README.md)

# Getting Started

## Installation
```bash
# NPM
npm install expressico@latest
# YARN
yarn add expressico@latest
```

## Basic Server Script
```typescript
import expressico, { defineConfig, defineController, defineMiddleware } from "expressico";

const actuator = defineController({
  path: "/api/actuator"
});

actuator.add({
  path: "/alive",
  handler: (r, response) => {
    response.ok("YES");
  }
});

const customMiddleware = defineMiddleware({
  name: "customMiddleware"
  handler: (request, response, next) => {
    console.log(request.hostname)
    next();
  }
});

const config = defineConfig({
  debug: true,
  controllers: [ actuator ],
  middleware: [ customMiddleware ]
});

expressico.start(config);
```

Yes, its that simple.
____

# Breakdown

## Localhost development
By default, while developing locally `Expressico` will allow all CORS to pass through your development server.

## HTTPS
By default, `Expressico` enforces any route to HTTPS, rather than HTTP. 

To disable this:
```typescript
const config = defineConfig({
  enforceHttps: false
})
```

## JSON Body Parser
By default `Expressico` enables the use of `req.body` and parses it as JSON.

## Compression
By default `Expressico` compresses the outgoing responses for quicker performance.

For more info see the [compression](https://www.npmjs.com/package/compression) package.

## Helpful response functions
`Expressico` automatically creates some helpful response functions, for instance, in your controller you can:
```typescript
controller.add({
  path: "/:id"
  handler: (req, res) => {
    const { id } = req.params;
    if(id) {
      res.ok({ SUCCESS: "The ID was successfully found and this 'ok' function returns this message and a status of 200" });
    } else {
      res.fail(400, "Bad request, the ID was not provided and this 'fail' function returns an error message and the provided status code of 400");
    }
  }
})
```

# Controller API

## Defining the controller
```typescript
import { defineController } from "expressico";
const controller = defineController({
  path: "/api" // all routes added to this controller will be prefixed with "/api"
})
```

## Adding routes to the controller
```typescript
import { defineController } from "expressico";
const controller = defineController({ path: "/api" });
controller.add({
  path: "/my-custom-route" // will resolve to "/api/my-custom-route"
  method: "GET" // "GET" is the default method, this field is optional
  before: [] // these are extra RequestHandlers that are executed *before* the main handler is called.
             // This is especially usefull for handling auth or other error handling scenarios

  handler: (r, response) => { // Your main handler for this route and will be the final response after all the before handlers are called.
    response.ok({ "OK": "everything seems good" });
  }
})
```
You can call the `.add` function as many times as you want as long as you export the `controller` definition.
```typescript
import { defineController } from "expressico";
const controller = defineController({ path: "/api" });
controller.add({ path: "/v1", handler: (r, response) => {
  response.ok({})
}});
controller.add({ path: "/v2", handler: (r, response) => {
  response.ok({})
}});
// you can also pass a spread array to the .add function...
controller.add(
  {
    path: "/v3", handler: (r, response) => {
      response.ok({})
    }
  },
  {
    path: "/v4", handler: (r, response) => {
      response.ok({})
    }
  }
);
```