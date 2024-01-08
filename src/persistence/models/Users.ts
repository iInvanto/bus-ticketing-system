import { Model } from "objection";
import { knex } from "..";

Model.knex(knex);

export class DbTicket extends Model {
  static tableName = "tickets";

  static idColumn = "id";

  id!: number;

  name!: string;
}
