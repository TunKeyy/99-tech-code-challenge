import { Client } from "@elastic/elasticsearch";
import { ClusterHealthResponse } from "@elastic/elasticsearch/lib/api/types";
import { config } from "@code-challenge/config";
import { winstonLogger } from "@TunKeyy/leo-shared";
import { Logger } from "winston";

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, "notificationElasticSearchServer", "debug");

const elasticSearchClient = new Client({
  node: `${config.ELASTIC_SEARCH_URL}`
});

export async function checkConnection(): Promise<void> {
  let isConnected = false;
  while (!isConnected) {
    try {
      const health: ClusterHealthResponse = await elasticSearchClient.cluster.health({});
      log.info(`Service Elasticsearch health status - ${health.status}`);
      isConnected = true;
    } catch (error) {
      log.error("Connection to Elasticsearch fail, retrying...");
      log.log("error", "checkConnection() method:", error);
    }
  }
}