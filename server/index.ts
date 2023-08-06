import cors from "cors";
import { Express } from "express";
import * as dotenv from "dotenv";
import express from "express";
import mountRoutes from "./routes";
import { queryNoCall } from "./db/db";
import config from "./config";

// elephantSQL for online hosting
// https://neon.tech/pricing

dotenv.config();

const port = config.PORT;

const app: Express = express();
app.use(cors());
app.use(express.json());
mountRoutes(app);

// ! Uncomment code below to create db schema.
/*
const createTables = [
  "CREATE TABLE IF NOT EXISTS SCHEMA(id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, type VARCHAR(10) CHECK (type = 'TV' OR type='MOVIE' OR TYPE='GAME'), name varchar(100), path varchar(100))",
  "CREATE TABLE IF NOT EXISTS USERS(id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, users_id INT, username VARCHAR(50), email VARCHAR(50), password VARCHAR(60), first_name VARCHAR(30), last_name VARCHAR(30),CONSTRAINT fk_users FOREIGN KEY(users_id) REFERENCES schema(id))",
  "CREATE TABLE IF NOT EXISTS MOVIES(id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, movies_id INT, name VARCHAR(100) NOT NULL, genre VARCHAR(100) NOT NULL, timeline DATE NOT NULL, CONSTRAINT fk_movies FOREIGN KEY(movies_id) REFERENCES schema(id))",
  "CREATE TABLE IF NOT EXISTS TV(id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, tv_id INT, name VARCHAR(100) NOT NULL, genre VARCHAR(100) NOT NULL, channel VARCHAR(100) NOT NULL, timeline DATE NOT NULL, CONSTRAINT fk_tv FOREIGN KEY(tv_id) REFERENCES schema(id))",
  "CREATE TABLE IF NOT EXISTS GAMES(id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, games_id INT, name VARCHAR(100) NOT NULL, brand VARCHAR(100), timeline DATE NOT NULL, CONSTRAINT fk_games FOREIGN KEY(games_id) REFERENCES schema(id))",
  "CREATE TABLE IF NOT EXISTS TOPICS(id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, name VARCHAR(100) NOT NULL, description VARCHAR(1000) NOT NULL, path varchar(100))",
  "CREATE TABLE IF NOT EXISTS QUIZZES(id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, name VARCHAR(100) NOT NULL, description VARCHAR(1000) NOT NULL, path varchar(100))",
  "ALTER TABLE USERS ADD UNIQUE (USERNAME)"
  "ALTER TABLE USERS ADD UNIQUE (email)"
];

const db = Promise.all([createTables.map((query) => queryNoCall(query))]);

*/

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
