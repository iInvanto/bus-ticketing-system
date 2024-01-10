import { Model } from "objection";
import { knex } from "..";

Model.knex(knex);

export class DbUser extends Model {
  static tableName = "users";

  static idColumn = "user_id";

  user_id!: number;

  first_name!: string;

  last_name!: string;

  email!: string;

  phone_number!: string;
}
