import { json } from "body-parser";
import { defineMiddleware } from './define';

export default defineMiddleware({
  name: "useJsonParsing",
  handler: json(),
})