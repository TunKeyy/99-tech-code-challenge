import { orderCreate } from "@code-challenge/controllers/create";
import { orderDelete } from "@code-challenge/controllers/delete";
import { orderById , orderGetAll } from "@code-challenge/controllers/get";
import { orderUpdate } from "@code-challenge/controllers/update";
import express, { Router } from "express";

const router: Router = express.Router();

export const orderRoutes = (): Router => {
  router.get("/", orderGetAll);
  router.get("/:orderId", orderById);
  router.post("/create", orderCreate);
  router.put("/:orderId", orderUpdate);
  router.delete("/:orderId", orderDelete);
  
  return router;
};