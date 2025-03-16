import express, { Router, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const router: Router = express.Router();

export function healthRoutes(): Router {
  router.get("/health", (_req: Request, res: Response) => {
    res.status(StatusCodes.OK).send("Application is healthy and OK");
  });
  return router;
}