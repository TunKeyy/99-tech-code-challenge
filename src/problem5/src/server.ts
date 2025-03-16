import "express-async-errors";
import http from "http";

import { config } from "@code-challenge/config";
import { winstonLogger } from "@TunKeyy/leo-shared";
import { Logger } from "winston";
import { Application } from "express";
import { appRoutes } from "@code-challenge/routes";
import { checkConnection } from "@code-challenge/elasticsearch";

const SERVER_PORT = 4000;
const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, "notificationServer", "debug");

export function start(app: Application): void {
  startServer(app);
  app.use(appRoutes);
  startElasticSearch();
}

function startElasticSearch(): void {
  checkConnection();
}

function startServer(app: Application): void {
  try {
    const httpServer: http.Server = new http.Server(app);
    log.info(`Worker with process id of ${process.pid} on notification server has started`);
    httpServer.listen(SERVER_PORT, () => {
      log.info(`Notification server running on port ${SERVER_PORT}`);
    });
  } catch (error) {
    log.log("error", "NotificationService startServer() method: ", error);
  }
}