import GoogleStrategy from "passport-google-oauth20";
import LinkedInStrategy from "passport-linkedin-oauth2-oidc";
import config from "@config/config";
import { googleVerify } from "./oauth.controller";

const googleStrategy = new GoogleStrategy.Strategy(
  {
    clientID: config.googleClientId,
    clientSecret: config.googleClientSecret,
    callbackURL: config.googleCallbackUrl,
    scope: ["profile", "email"],
  },
  function (accessToken, refreshToken, profile, cb) {
    return googleVerify(profile, cb);
  }
);

// const linkedInStrategy = new LinkedInStrategy.Strategy(
//   {
//     clientID: config.linkedinClientId,
//     clientSecret: config.linkedinClientSecret,
//     callbackURL: config.linkedinCallbackUrl,
//     scope: ["profile", "openid"],
//     profileFields: ["id", "picture-url", "public-profile-url", "headline"],
//   },
//   async function (accessToken, refreshToken, profile, cb) {
//     return cb(null, profile);
//   }
// );
const linkedInStrategy = {};
export { googleStrategy, linkedInStrategy };
