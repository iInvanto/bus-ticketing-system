import { Router } from "express";
import ticketRouter from "./ticket";
import busRouter from "./bus";
import adminRouter from "./admin";

export const v1Controller = (): Router => {
  const router = Router();

  // public routes

  // user authentication middleware can be implemented here
  // also attach logged in user details to req object here
  // TODO: implement user authentication

  // authenticated routes
  router.use("/admin", adminRouter());
  router.use("/bus", busRouter());
  router.use("/ticket", ticketRouter());

  return router;
};
