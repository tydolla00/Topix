"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mountRoutes_1 = __importDefault(require("./routes/mountRoutes"));
const config_1 = __importDefault(require("./config"));
// elephantSQL for online hosting
// https://neon.tech/pricing
dotenv.config();
const port = config_1.default.PORT;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, mountRoutes_1.default)(app);
app.get("/", (req, res) => {
    res.send("Hello World");
});
// ! Uncomment code below to create db schema.
/*
const createTables = [
  "CREATE TABLE IF NOT EXISTS SCHEMA(id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, type VARCHAR(10) CHECK (type = 'TV' OR type='MOVIE' OR TYPE='GAME'), name varchar(100), path varchar(100))",
  "CREATE TABLE IF NOT EXISTS USERS(id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, users_id INT, username VARCHAR(50), email VARCHAR(50), password VARCHAR(60), first_name VARCHAR(30), last_name VARCHAR(30), profile_picture varchar(100),CONSTRAINT fk_users FOREIGN KEY(users_id) REFERENCES schema(id))",
  "CREATE TABLE IF NOT EXISTS MOVIES(id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, movies_id INT, name VARCHAR(100) NOT NULL, genre VARCHAR(100) NOT NULL, timeline DATE NOT NULL, CONSTRAINT fk_movies FOREIGN KEY(movies_id) REFERENCES schema(id))",
  "CREATE TABLE IF NOT EXISTS TV(id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, tv_id INT, name VARCHAR(100) NOT NULL, genre VARCHAR(100) NOT NULL, channel VARCHAR(100) NOT NULL, timeline DATE NOT NULL, CONSTRAINT fk_tv FOREIGN KEY(tv_id) REFERENCES schema(id))",
  "CREATE TABLE IF NOT EXISTS GAMES(id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, games_id INT, name VARCHAR(100) NOT NULL, brand VARCHAR(100), timeline DATE NOT NULL, CONSTRAINT fk_games FOREIGN KEY(games_id) REFERENCES schema(id))",
  "CREATE TABLE IF NOT EXISTS TOPICS(id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, name VARCHAR(100) NOT NULL, description VARCHAR(1000) NOT NULL, path varchar(100))",
  "CREATE TABLE IF NOT EXISTS QUIZZES(id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, name VARCHAR(100) NOT NULL, description VARCHAR(1000) NOT NULL, path varchar(100))",
  "CREATE TABLE IF NOT EXISTS CONTACT (id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,first_name VARCHAR(30) NOT NULL,last_name VARCHAR(30) NOT NULL,email VARCHAR(50) NOT NULL,subject VARCHAR(30) NOT NULL CHECK (subject IN ('Bug Fixes','Talk to me about your experience','Suggestions','Other')),message VARCHAR(3000) NOT NULL);",
  "ALTER TABLE USERS ADD UNIQUE (USERNAME)",
  "ALTER TABLE USERS ADD UNIQUE (email)",
];

const db = Promise.all([createTables.map((query) => queryNoCall(query))]);
*/
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
