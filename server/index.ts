import cors from "cors";
import { Express } from "express";
import * as dotenv from "dotenv";
import express from "express";
import mountRoutes from "./routes";
import { queryNoCall } from "./db/db";
import config from "./config";

// elephantSQL for online hosting

dotenv.config();

const port = config.PORT;

const app: Express = express();
app.use(cors());
app.use(express.json());
mountRoutes(app);

const createTables = [
  "CREATE TABLE IF NOT EXISTS SCHEMA(id SERIAL PRIMARY KEY, type VARCHAR(10) CHECK (type = 'TV' OR type='MOVIE' OR TYPE='GAME'), name varchar(100), path varchar(100))",
];
const db = Promise.all([queryNoCall(createTables[0])]);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
