import dotenv from "dotenv";

dotenv.config({});

class Config {
  public NODE_ENV: string | undefined;
  public ELASTIC_SEARCH_URL: string | undefined;
  public POSTGRES_HOST: string | undefined;
  public POSTGRES_PASSWORD: string | undefined;
  public POSTGRES_USERNAME: string | undefined;
  public POSTGRES_DB: string | undefined;

  constructor() {
    this.NODE_ENV = process.env.NODE_ENV || "";
    this.ELASTIC_SEARCH_URL = process.env.ELASTIC_SEARCH_URL || "";
    this.POSTGRES_HOST = process.env.POSTGRES_HOST || "";
    this.POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || "";
    this.POSTGRES_USERNAME = process.env.POSTGRES_USERNAME || "";
    this.POSTGRES_DB = process.env.POSTGRES_DB || "";
  }
}

export const config: Config = new Config();