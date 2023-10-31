import passport from "passport";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import config from "../config/index";

import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

// console.log(config.JWT_KEY)

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_KEY,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await prisma.users.findUnique({
        where: {
          id: jwt_payload.id,
        },
        select: {
          id: true,
          username: true,
          email: true,
          password: true,
          friends: {
            select: {
              friendId: true,
            },
          },
        },
      });
      if (!user) {
        return done(new Error("User not found."), false);
      }
      return done(null, user);
    } catch (err) {
      done(err);
    }
  })
);

export const isLogin = passport.authenticate("jwt", { session: false });
