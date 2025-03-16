import { winstonLogger } from "@TunKeyy/leo-shared";
import { config } from "@code-challenge/config";
import { Logger } from "winston";
import express, { Express } from "express";
import { start } from "@code-challenge/server";

import { initSequelize } from "./database";

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, "notificationApp", "debug");

function initialize(): void {
  initSequelize({
      database: config.POSTGRES_DB,
      username: config.POSTGRES_USERNAME,
      password: config.POSTGRES_PASSWORD,
      options: {
        host: config.POSTGRES_HOST,
        dialect: "postgres",
      }
    }
  );
  
  const app: Express = express();
  start(app);
  log.info("Express Application Initialized");
}

initialize();