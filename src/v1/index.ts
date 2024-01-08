import { Router } from "express";
import ticketRouter from "./ticket";

export const v1Controller = (): Router => {
  const router = Router();

  router.use("/ticket", ticketRouter());

  return router;
};
