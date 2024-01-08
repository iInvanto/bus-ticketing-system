import { Model } from "objection";
import { knex } from "..";

Model.knex(knex);

export class DbUser extends Model {
  static tableName = "users";

  //   CREATE TABLE Users (
  //     user_id SERIAL PRIMARY KEY,
  //     first_name VARCHAR(50) NOT NULL,
  //     last_name VARCHAR(50) NOT NULL,
  //     email VARCHAR(100) UNIQUE NOT NULL,
  //     phone_number VARCHAR(20) NOT NULL
  // );

  static idColumn = "user_id";

  user_id!: number;

  first_name!: string;

  last_name!: string;

  email!: string;

  phone_number!: string;
}
