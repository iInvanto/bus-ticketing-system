import { Model } from "objection";
import { knex } from "..";

Model.knex(knex);

export class DbBus extends Model {
  static tableName = "bus";

  //   CREATE TABLE Bus (
  //     bus_id SERIAL PRIMARY KEY,
  //     bus_number VARCHAR(20) NOT NULL,
  //     capacity INT NOT NULL
  // );

  static idColumn = "bus_id";

  bus_id!: number;

  bus_number!: string;

  capacity!: number;
}
