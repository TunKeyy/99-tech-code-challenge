import { verifyGatewayRequest } from "@TunKeyy/leo-shared";
import { Application } from "express";
import { healthRoutes } from "@code-challenge/routes/health";
import { orderRoutes } from "@code-challenge/routes/order";

const BASE_PATH = "/api/v1/order";

const appRoutes = (app: Application): void => {
  app.use("", healthRoutes());
  app.use(BASE_PATH, verifyGatewayRequest, orderRoutes());
};

export { appRoutes };