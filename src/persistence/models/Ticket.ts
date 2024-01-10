import { Model } from "objection";
import { knex } from "..";

Model.knex(knex);

export class DbTicket extends Model {
  static tableName = "ticket";

  static idColumn = "ticket_id";

  ticket_id!: number;

  bus_id!: number;

  seat_number!: number;

  is_open!: boolean;

  user_details!: string | null;
}
