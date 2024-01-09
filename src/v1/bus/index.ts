import { Request, Response, Router } from "express";
import { DbBus } from "../../persistence/models/Bus";

export default function busRouter(): Router {
  const route = Router({ mergeParams: true });

  // get all available buses
  route.get("/allBus", async (req: Request, res: Response) => {
    try {
      const buses = await DbBus.query();

      res.status(200).json({ buses });
    } catch (error) {
      console.error({ error }, "Error getting all bus");
      res.status(500).json({ message: "Error getting buses" });
    }
  });

  return route;
}
