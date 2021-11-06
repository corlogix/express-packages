import { RequestHandler } from 'express';
import { defineController } from "expressico";
import { nanoid } from "nanoid";
import context from './context';
import { requireAuth } from './requireAuth';
import { encryptPassword, validatePassword } from './services/bcrypt';
import { signNewToken } from './services/jsonwebtoken';

const auth = defineController({ path: "/api/v1/auth" });

const requirePassword: RequestHandler = (req, res, next) => {
  const body = req.body;
  if(!body) {
    res.fail(302, "No Content");
    return;
  }

  if(!body?.password) {
    res.fail(400, "Password is required for this api.");
    return;
  }
  next();
}

auth.add(
  {
    path: "/me",
    method: "get",
    before: [requireAuth()],
    handler: (req, res) => {
      res.ok(req.user);
    }
  },
  {
    path: "/login",
    method: "post",
    before: [requirePassword],
    handler: async (req, res) => {
      const body = req.body;

      const user = await context.locateUser(body);

      if (!user){
        res.fail(404, "User doesn't exist");
        return;
      }

      if(!validatePassword(user?.password, body?.password)) {
        res.fail(401, "Password entered was incorrect");
        return;
      }

      const tokenPayload = {...user};
      delete tokenPayload.password;

      const token = signNewToken(tokenPayload);

      res.ok({ token });
    },
  },
  {
    path: "/register",
    method: "post",
    before: [requirePassword],
    handler: async (req, res) => {
      const body = req.body || {};
      const password = encryptPassword(body?.password);

      let user = await context.locateUser(body); 
      if(user) {
        res.fail(302, 'User exists');
        return;
      }

      try {
        const id = nanoid();

        user = await context.createUser({ id, ...body, password });

        const tokenPayload = {...user};
        delete tokenPayload?.password;

        const token = signNewToken(tokenPayload);

        res.ok({
          token,
          ...tokenPayload,
        });
      } catch(err) {
        console.error(err);
        res.fail(500, 'Unable to create user');
      }
    }
  }
);

export default auth;