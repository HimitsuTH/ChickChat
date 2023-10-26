import passport from "passport";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey:
    "https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.he0ErCNloe4J7Id0Ry2SEDg09lKkZkfsRiGsdX_vgEg",
};

type TUser = {
  id: string;
  email: string;
  username: string;
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await prisma.users.findFirst({
        where: {
          id: jwt_payload.id,
        },
        select: {
            id:true,
            username: true,
            email: true,
            password: true
        }
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
