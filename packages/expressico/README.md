# Expressico! [![Build](https://github.com/corlogix/express-packages/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/corlogix/express-packages/actions/workflows/build.yml) [![npm version](https://badge.fury.io/js/expressico.svg)](https://badge.fury.io/js/expressico)

`Expressico` is a Express.JS bootstrapper, it includes a versitile configuration that is simple and easy to use. This bootstrap package will help keep your codebase clean and modular for those pesky microservices that you keep copying the same code over and over again.

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
// For Typescript
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

const customMiddleware = defineMiddleware(
  (request, response, next) => {
    console.log(request.hostname)
    next();
  }
);

const config = defineConfig({
  debug: true,
  controllers: [
    actuator
  ],
  middleware: [
    customMiddleware
  ]
});

expressico.start(config);

```

