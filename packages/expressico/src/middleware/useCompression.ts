import compression from "compression";
import { defineMiddleware } from './define';

export default defineMiddleware({
  name: "useCompression",
  handler: compression()
})