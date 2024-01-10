import { Request, Response, Router } from "express";
import { DbTicket } from "../../persistence/models/Ticket";
import {
  GetTicketsByStatusParams,
  GetTicketsDetailParams,
  PostBookTicketBody,
  PutBookTicketBody,
} from "./types";

export default function ticketRouter(): Router {
  const route = Router({ mergeParams: true });

  route.get("/all_tickets", async (req: Request, res: Response) => {
    try {
      const allTickets = await DbTicket.query();
      res.status(200).json(allTickets);
    } catch (error) {
      console.error("Error getting all tickets:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  route.post("/book", async (req: Request, res: Response) => {
    const { bus_id, seat_number, user_details } =
      req.body as unknown as PostBookTicketBody;

    try {
      // Check if the seat is available
      const seat = await DbTicket.query()
        .where("bus_id", bus_id)
        .andWhere("seat_number", seat_number)
        .first();

      // throw err if seat is already booked
      if (seat && !seat.is_open) {
        res.status(500).json({ message: "Seat is already booked" });
      }

      if (!seat) {
        const ticket = new DbTicket();
        ticket.bus_id = bus_id;
        ticket.seat_number = seat_number;
        ticket.is_open = false;
        ticket.user_details = JSON.stringify(user_details);

        await DbTicket.query().insert(ticket).returning("*");
      } else {
        await DbTicket.query()
          .update({
            is_open: false,
            user_details: JSON.stringify(user_details),
          })
          .where("bus_id", bus_id)
          .andWhere("seat_number", seat_number);
      }

      const updatedTicket = await DbTicket.query()
        .where("bus_id", bus_id)
        .andWhere("seat_number", seat_number)
        .first();

      res.status(201).json({
        message: "Seat booked successfully",
        ticket: {
          ...updatedTicket,
          user_details: updatedTicket?.user_details
            ? JSON.parse(updatedTicket?.user_details)
            : undefined,
        },
      });
    } catch (error) {
      console.error("Error booking seat:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  route.put("/update", async (req: Request, res: Response) => {
    const { ticket_id, is_open, user_details } =
      req.body as unknown as PutBookTicketBody;

    try {
      // Check if the ticket is available
      const ticket = await DbTicket.query()
        .where("ticket_id", ticket_id)
        .first();

      if (!ticket) {
        res.status(500).json({ message: "Ticket not found." });
      }

      await DbTicket.query()
        .update({
          is_open: Boolean(is_open),
          user_details: JSON.stringify(user_details),
        })
        .where("ticket_id", ticket_id);

      const updatedTicket = await DbTicket.query()
        .where("ticket_id", ticket_id)
        .first();

      res.status(201).json({
        message: "Ticket updated successfully",
        ticket: {
          ...updatedTicket,
          user_details: updatedTicket?.user_details
            ? JSON.parse(updatedTicket?.user_details)
            : undefined,
        },
      });
    } catch (error) {
      console.error("Error while updating ticket", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  route.get("/:status", async (req: Request, res: Response) => {
    // status will be all, open, closed
    const { status } = req.params as unknown as GetTicketsByStatusParams;

    try {
      if (status === "close") {
        const closedTickets = await DbTicket.query().where("is_open", false);
        res.status(200).json({ tickets: closedTickets });
      }

      if (status === "open") {
        const openTickets = await DbTicket.query().where("is_open", true);
        res.status(200).json({ tickets: openTickets });
      }

      res.status(200).json({ tickets: [] });
    } catch (error) {
      console.error("Error getting tickets", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  route.get("/:ticketId/detail", async (req: Request, res: Response) => {
    const { ticketId } = req.params as unknown as GetTicketsDetailParams;

    try {
      const ticketDetail = await DbTicket.query()
        .where("ticket_id", ticketId)
        .first();

      if (!ticketDetail) {
        res.status(500).json({ message: "Ticket not found" });
      }

      const details = {
        ...ticketDetail,
        user_details: ticketDetail?.user_details
          ? JSON.parse(ticketDetail?.user_details)
          : undefined,
      };

      res.status(200).json({ ticket: details });
    } catch (error) {
      console.error("Error getting tickets", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  return route;
}
