import dotenv from "dotenv";

// Parsing the env file.
dotenv.config();

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at alle

interface ENV {
  PORT: number | undefined;
  PGUSER: string | undefined;
  PGHOST: string | undefined;
  PGDATABASE: string | undefined;
  PGPORT: number | undefined;
  PGPASSWORD: string | undefined;
  API_KEY: string | undefined;
  SECRET_KEY: string | undefined;
  GOOGLE_SERVICE_KEY: string | undefined;
}

interface Config {
  PORT: number;
  PGUSER: string;
  PGHOST: string;
  PGDATABASE: string;
  PGPORT: number;
  PGPASSWORD: string;
  API_KEY: string;
  SECRET_KEY: string;
  GOOGLE_SERVICE_KEY: string;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    PGUSER: process.env.PGUSER,
    PGHOST: process.env.PGHOST,
    PGDATABASE: process.env.PGDATABASE,
    PGPORT: process.env.PGPORT ? Number(process.env.PGPORT) : undefined,
    PGPASSWORD: process.env.PGPASSWORD,
    API_KEY: process.env.API_KEY,
    SECRET_KEY: process.env.SECRET_KEY,
    GOOGLE_SERVICE_KEY: process.env.GOOGLE_SERVICE_KEY,
  };
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
