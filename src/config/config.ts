import Joi from "joi";

import dotenv from "dotenv";
dotenv.config();

const envsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "integration", "development")
      .required(),
    PORT: Joi.number().default(8080),
    API_KEY_TOKEN: Joi.string().required(),
    MONGO_URI_DB_TEMPLATES: Joi.string().required(),
    MONGO_URI_DB_DASHBOARD: Joi.string().required(),
    GOOGLE_CLIENT_ID: Joi.string().required(),
    GOOGLE_CLIENT_SECRET: Joi.string().required(),
    GOOGLE_CALLBACK_URL: Joi.string().required(),
    LINKEDIN_CLIENT_ID: Joi.string().required(),
    LINKEDIN_CLIENT_SECRET: Joi.string().required(),
    LINKEDIN_CALLBACK_URL: Joi.string().required(),
  })
  .unknown(true);

const { value: envVars, error } = envsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(
    `Config validation error: ${error.message}. \n
     This app requires env variables to work properly. If you run app locally use docker-compose`
  );
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  xApiKey: envVars.API_KEY_TOKEN,
  mongoUriTemplates: envVars.MONGO_URI_DB_TEMPLATES,
  mongoUriDashboard: envVars.MONGO_URI_DB_DASHBOARD,
  googleClientId: envVars.GOOGLE_CLIENT_ID,
  googleClientSecret: envVars.GOOGLE_CLIENT_SECRET,
  googleCallbackUrl: envVars.GOOGLE_CALLBACK_URL,
  linkedinClientId: envVars.LINKEDIN_CLIENT_ID,
  linkedinClientSecret: envVars.LINKEDIN_CLIENT_SECRET,
  linkedinCallbackUrl: envVars.LINKEDIN_CALLBACK_URL,
};
