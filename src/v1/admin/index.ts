import { Request, Response, Router } from "express";
import { DbBus } from "../../persistence/models/Bus";
import { CreateBusBody, RollOverPathParams } from "./types";
import { DbTicket } from "../../persistence/models/Ticket";

export default function adminRouter(): Router {
  const route = Router({ mergeParams: true });

  // TODO: implement middleware for admin to check roles and permission for the user here

  route.post("/bus/create", async (req: Request, res: Response) => {
    const { bus_number, capacity } = req.body as unknown as CreateBusBody;

    try {
      // TODO: add validation for bus number is already present or not
      const bus = new DbBus();
      bus.bus_number = bus_number;
      bus.capacity = capacity;

      const insertedBus = await DbBus.query().insert(bus).returning("*");

      res.status(200).json({ bus: insertedBus });
    } catch (error) {
      console.error({ error }, "Something went wrong while creating bus");
      res
        .status(500)
        .json({ message: "Something went wrong while creating bus" });
    }
  });

  route.put("/bus/:busId/roll-over", async (req: Request, res: Response) => {
    const { busId: bus_id } = req.params as unknown as RollOverPathParams;
    const busId = parseInt(bus_id, 10);

    try {
      const tickets = await DbTicket.query().where("bus_id", busId);

      if (tickets.length > 0) {
        await DbTicket.query()
          .update({ is_open: true, user_id: null })
          .where("bus_id", busId);

        res.status(200).json({
          message: "Bus roll-overed.",
        });
      } else {
        res.status(200).json({
          message:
            "There is nothing to roll-over for this bus. All seats are open.",
        });
      }
    } catch (error) {
      console.error(
        { error },
        "Something went wrong while rolling over for bus"
      );
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return route;
}
