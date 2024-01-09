import { Model } from "objection";
import { knex } from "..";

Model.knex(knex);

export class DbBus extends Model {
  static tableName = "bus";

  static idColumn = "bus_id";

  bus_id!: number;

  bus_number!: string;

  capacity!: number;

  created_at!: Date;
}
