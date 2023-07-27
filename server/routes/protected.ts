import Router from "express-promise-router";
import { Router as ExpressRouter } from "express";
import { User } from "../models/types";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import config from "../config";
import { queryNoCall as query } from "../db/db";

const router: ExpressRouter = new (Router as any)();
export default router;

// ? Middleware to protect all authorized routes. Will be called first before reaching endpoint.
router.use((req, res, next) => {
  if (req.path === "/signup" || req.path === "/login") return next();
  jwtValidate(req, res, next);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  res.send(`Good Request ${id}`);
});

router.post("/signup", async (req, res) => {
  const user: User = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;

  await query(
    "INSERT INTO USERS(username,email,password,first_name,last_name) VALUES($1,$2,$3,$4,$5) RETURNING *",
    Object.values(user)
  );

  const expirationDate = Math.floor(Date.now() / 1000 + 60 * 60);
  const accessToken = jwtCreate(user.username, expirationDate);
  res.json({
    accessToken: accessToken,
    expiry: expirationDate,
    firstName: user.firstName,
  });
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const queryResult = await query("SELECT * FROM USERS WHERE username = $1", [
    username,
  ]);
  const user: User = queryResult.rows[0];

  const isEqual = await bcrypt.compare(req.body.password, user.password);
  if (!isEqual)
    return res.status(401).send({ error: "Invalid username or password" });

  const expirationDate = Date.now() / 1000 + 60 * 60;
  const accessToken = jwtCreate(username, expirationDate);
  res.json({
    token: accessToken,
    expiry: expirationDate,
    firstName: user.firstName,
  });
});

const jwtValidate = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, config.SECRET_KEY, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const jwtCreate = (username: string, expirationDate: number) => {
  return jwt.sign(
    {
      sub: username,
      iat: Math.floor(Date.now() / 1000),
      exp: expirationDate, // Expire after one hour
    },
    config.SECRET_KEY
  );
};
