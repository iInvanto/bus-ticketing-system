import { Model } from "objection";
import { knex } from "..";

Model.knex(knex);

export class DbTicket extends Model {
  static tableName = "ticket";

  //   CREATE TABLE Ticket (
  //     ticket_id SERIAL PRIMARY KEY,
  //     bus_id INT REFERENCES Bus(bus_id) ON DELETE CASCADE,
  //     seat_number INT NOT NULL,
  //     is_open BOOLEAN,
  //     user_id INT REFERENCES Customer(customer_id) ON DELETE SET NULL,
  //     reservation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  // );

  static idColumn = "ticket_id";

  ticket_id!: number;

  bus_id!: number;

  seat_number!: number;

  is_open!: boolean;

  user_id!: number | null;
}
