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

const app: Application = express();

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: config.googleClientId,
      clientSecret: config.googleClientSecret,
      callbackURL: config.googleCallbackUrl,
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile)
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
    }
  )
);

app.use(cors());
app.use(httpContext.middleware);
app.use(httpLogger.successHandler);
app.use(httpLogger.errorHandler);
app.use(uniqueReqId);
app.use(express.json());
app.use(consts.API_ROOT_PATH, api);
app.use(swaggerApiDocs);
app.use(http404);

app.use(errorHandling);

export default app;
