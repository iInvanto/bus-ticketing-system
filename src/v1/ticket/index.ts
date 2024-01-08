import { Router } from "express";
import { DbTicket } from "../../persistence/models/Users";

export default function ticketRouter(): Router {
  const route = Router({ mergeParams: true });

  route.get("/", async (req, res) => {
    console.log("req");

    const ticket = new DbTicket();
    ticket.name = "first";

    const tickets = await DbTicket.query().insert(ticket).returning("*");
    console.log("tickets", tickets);
  });

  return route;
}
