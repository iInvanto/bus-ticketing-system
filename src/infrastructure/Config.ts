import {
  OptionsJson as BodyParserOptions,
  OptionsUrlencoded,
} from "body-parser";
import { CorsOptions } from "cors";
import dotenv from "dotenv";

dotenv.config();

export interface AppConfig {
  env: string;
  host: string;
  port: number;
  ssl: {
    enabled: boolean;
    key?: string;
    cert?: string;
  };
}

export interface V1Config {
  postgresConfig: {
    host: string;
    port: number;
    user?: string;
    pass?: string;
    db: string;
  };
}

export class ConfigImpl {
  appConfig: AppConfig = {
    env: process.env.NODE_ENV || "development",
    host: process.env.APP_HOST || "localhost",
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5010,
    ssl: {
      enabled: process.env.APP_SSL_ENABLED === "true",
      key: process.env.APP_SSL_KEY,
      cert: process.env.APP_SSL_CERTIFICATE,
    },
  };

  // express body-parser config
  // https://github.com/expressjs/body-parser
  bodyParserConfig: BodyParserOptions = {
    limit: "10mb",
  };

  // express cors config
  // https://github.com/expressjs/cors
  corsConfig: CorsOptions = {
    origin: process.env.CORS_ALLOWED?.split(",") || "*",
    methods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Session"],
    exposedHeaders: [
      "Content-Length",
      "X-Request-Id",
      "nt",
      "Content-Disposition",
    ],
    credentials: true,
  };

  // express urlencoded config
  // http://expressjs.com/en/resources/middleware/body-parser.html#bodyparserurlencodedoptions
  urlEncodedConfig: OptionsUrlencoded = {
    extended: true,
  };

  // v1 configs
  // we will remove these as they are updated and/or made redundant by v2 work
  v1: V1Config = {
    postgresConfig: {
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      user: process.env.DB_USER ?? "postgres",
      pass: process.env.DB_PASSWORD,
      db: process.env.DB_DATABASE || "realtime",
    },
  };
}
