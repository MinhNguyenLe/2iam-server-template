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

// import session from "express-session";
import cookieSession from "cookie-session";
import { googleStrategy, linkedInStrategy } from "service-oauth";

const app: Application = express();

passport.use(googleStrategy);
// passport.use(linkedInStrategy);

passport.serializeUser((user, cb) => {
  console.log("serializeUser", user);
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  console.log("deserializeUser", user);
  cb(null, user);
});

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:4444",
      "http://localhost:12000",
      "http://localhost:5000",
      "http://localhost:7000",
      "https://3m.2iam.net",
      "https://dashboard.2iam.net"
    ],
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
    maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    keys: ["secret"],
    name: "session",
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Must be put this line at the end of setup file
app.use(consts.API_ROOT_PATH, api);

app.use(swaggerApiDocs);
app.use(http404);

app.use(errorHandling);

export default app;
