import { Request, Response, Router } from "express";
import { DbTicket } from "../../persistence/models/Ticket";

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

  // route.post("/book_seat", async (req: Request, res: Response) => {
  //   try {
  //     const { bus_id, seat_number, user_name, user_details } = req.body;

  //     // Check if the seat is available
  //     const isSeatAvailable = await DbTicket.query()
  //       .where({ bus_id, seat_number, is_open: true })
  //       .first();

  //     if (isSeatAvailable) {
  //       // Seat is available, create the ticket
  //       const bookedTicket = await DbTicket.query().insert({
  //         bus_id,
  //         seat_number,
  //         is_open: false,
  //         user_name,
  //         user_details,
  //       });

  //       res
  //         .status(201)
  //         .json({ message: "Seat booked successfully", ticket: bookedTicket });
  //     } else {
  //       res.status(400).json({ message: "Seat not available" });
  //     }
  //   } catch (error) {
  //     console.error("Error booking seat:", error);
  //     res.status(500).json({ message: "Internal Server Error" });
  //   }
  // });

  route.post("/:status", async (req: Request, res: Response) => {
    // status will be all, open, closed
  });

  route.post("/:ticketId/status", async (req: Request, res: Response) => {});

  return route;
}
