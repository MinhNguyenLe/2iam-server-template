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
    MONGO_URI: Joi.string().required(),
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
  mongoUri: envVars.MONGO_URI,
};
