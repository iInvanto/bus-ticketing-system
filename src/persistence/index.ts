import Knex from "knex";
import { ConfigImpl } from "../infrastructure/Config";

// this is re-using the old configuration to ease migration, it may be better to use a connection string in the long run
const config = new ConfigImpl();
const { v1 } = config;
const { postgresConfig } = v1;

const knexConfig: any = {
  client: "pg",
  connection: {
    host: postgresConfig.host,
    port: postgresConfig.port,
    user: postgresConfig.user,
    password: postgresConfig.pass,
    database: postgresConfig.db,
  },
  pool: {
    min: 0,
    max: 10,
  },
  debug: process.env.ENABLE_KNEX_QUERY_LOGGING === "true",
};

export const knex = Knex(knexConfig);
