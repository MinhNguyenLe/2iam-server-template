import express, { Application } from "express";

import api from "api";
import httpContext from "express-http-context";
import consts from "@config/consts";
import httpLogger from "@core/utils/httpLogger";
import errorHandling from "@core/middlewares/errorHandling.middleware";
import uniqueReqId from "@core/middlewares/uniqueReqId.middleware";
import http404 from "@components/404/404.router";
import swaggerApiDocs from "@components/swagger-ui/swagger.router";

import cors from "cors";

import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import config from "@config/config";
// import session from "express-session";
import cookieSession from "cookie-session";
import UsersModel from "mongo/schema/users";

const app: Application = express();

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: config.googleClientId,
      clientSecret: config.googleClientSecret,
      callbackURL: config.googleCallbackUrl,
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, cb) {
      const user = await UsersModel.findOne({ "oauth.google.id": profile.id });

      if (!user) {
        const userId = await UsersModel.create({
          username: profile.id,
          oauth: {
            google: {
              id: profile.id,
              displayName: profile.displayName,
              photos: profile.photos,
            },
          },
        });
        return cb(null, {
          id: userId._id,
        });
      } else {
        await UsersModel.findOneAndUpdate(
          { username: profile.id },
          {
            "oauth.google.displayName": profile.displayName,
            "oauth.google.photos": profile.photos,
          },
          { upsert: true }
        );
        return cb(null, {
          id: user._id,
        });
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.use(
  cors({
    origin: ["http://localhost:4444", "http://localhost:12000"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(httpContext.middleware);
app.use(httpLogger.successHandler);
app.use(httpLogger.errorHandler);
app.use(uniqueReqId);
app.use(express.json());

// app.use(
//   session({
//     secret: "session",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true, maxAge: 60000 },
//   })
// );
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["secret"],
    name: "session",
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(consts.API_ROOT_PATH, api);

app.use(swaggerApiDocs);
app.use(http404);

app.use(errorHandling);

export default app;
