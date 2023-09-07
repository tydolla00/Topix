import dotenv from "dotenv";

dotenv.config();

interface ENV {
  DATABASE_URL: string | undefined;
  SECRET_KEY: string | undefined;
  GOOGLE_SERVICE_KEY: string | undefined;
  NEXTAUTH_SECRET: string | undefined;
  NEXTAUTH_URL: string | undefined;
  VERCEL_URL: string | undefined;
}

interface Config {
  DATABASE_URL: string;
  SECRET_KEY: string;
  GOOGLE_SERVICE_KEY: string;
  NEXTAUTH_SECRET: string;
  NEXTAUTH_URL: string;
  VERCEL_URL: string;
}

const getConfig = (): ENV => {
  return {
    DATABASE_URL: process.env.DATABASE_URL,
    SECRET_KEY: process.env.SECRET_KEY,
    GOOGLE_SERVICE_KEY: process.env.GOOGLE_SERVICE_KEY,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    VERCEL_URL: process.env.VERCEL_URL,
  };
};

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
