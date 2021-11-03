import { json } from "body-parser";
import { defineMiddleware } from './define';

export const parseJsonRequests = () => json();

export default defineMiddleware({
  name: "useJsonParsing",
  handler: json(),
})