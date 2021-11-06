import context, { AuthConfig } from './context';
import controller from "./controller";

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

export { controller as authController };

export * from "./requireAuth";

export default function defineAuth(config: AuthConfig) {
  context.loadConfig(config);
}