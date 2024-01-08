import { Model } from "objection";
import { knex } from "..";

Model.knex(knex);

export class DbAdmin extends Model {
  static tableName = "admin";

  //   CREATE TABLE Admin (
  //     admin_id SERIAL PRIMARY KEY,
  //     username VARCHAR(50) UNIQUE NOT NULL,
  //     password VARCHAR(100) NOT NULL
  // );

  static idColumn = "admin_id";

  admin_id!: number;

  username!: string;

  password!: string;
}
