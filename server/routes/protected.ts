import Router from "express-promise-router";
import { Router as ExpressRouter, Request, Response } from "express";
import { User } from "../models/types";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import config from "../config";
import { queryNoCall as query } from "../db/db";
import multer from "multer";
import { deleteFile, getFile, uploadFile } from "../googledrive";
import express from "express";
import fs from "fs";

const router: ExpressRouter = new (Router as any)();
export default router;

const upload = multer();

router.use(express.urlencoded({ extended: true }));
// ? Middleware to protect all authorized routes. Will be called first before reaching endpoint.
router.use((req, res, next) => {
  if (req.path === "/signup" || req.path === "/login") return next();
  jwtValidate(req, res, next);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  return res.send(`Good Request ${id}`);
});

router.post("/signup", async (req, res) => {
  const user: User = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    first_name: req.body.firstName,
    last_name: req.body.lastName,
  };
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;

  try {
    await query(
      "INSERT INTO USERS(username,email,password,first_name,last_name) VALUES($1,$2,$3,$4,$5) RETURNING *",
      Object.values(user)
    );
    return res.send(200).send("Success");
  } catch (error: any) {
    console.log(error);
    return res.status(404).send(`Error ${error.detail.substring(4)}`);
  }
});

router.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const queryResult = await query(
      "SELECT * FROM USERS WHERE username = $1 OR email = $1",
      [username]
    );
    const user: User = queryResult.rows[0];
    console.log(user);
    if (!user) return res.status(401).send("Username or email does not exist");

    const isEqual = await bcrypt.compare(req.body.password, user.password);
    if (!isEqual) {
      console.log("Error: Invalid Username or Password");
      return res.status(401).send("Invalid username or password");
    }
    const expirationDate = Date.now() / 1000 + 60 * 60;
    const accessToken = jwtCreate(username, expirationDate);
    console.log(user.first_name);
    return res.json({
      token: accessToken,
      expiry: expirationDate,
      firstName: user.first_name,
      profile_picture: user.profile_picture,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});

// ? req.user.sub is the username stored in the request.
router.post("/upload", upload.single("file"), async (req: any, res: any) => {
  try {
    console.log(req.user);
    const { file } = req;
    const userQuery = await query("SELECT * FROM USERS WHERE username = $1", [
      req.user.sub,
    ]);
    const user: User = userQuery.rows[0];
    console.log(user);
    if (user.profile_picture) await deleteFile(user.profile_picture);
    const driveId = await uploadFile(file, user.username);
    await query("UPDATE USERS SET profile_picture = $1 WHERE username = $2", [
      driveId,
      user.username,
    ]);
    return res.status(200).send(driveId);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
});

router.get("/pic/:fileId", async (req: any, res) => {
  try {
    const { fileId } = req.params;
    const file = await getFile(fileId);
    console.log("File here in protected");
    console.log(file);
    console.log(file.headers["content-type"]);
    console.log(file.headers["content-length"]);
    res.setHeader("Content-Type", file.headers["content-type"]);
    res.setHeader("Content-Length", file.headers["content-length"]);
    file.data.pipe(res);
    // const stream = fs.createReadStream(file);
    // stream.pipe(res);
  } catch (error: any) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

const jwtValidate = (req: any, res: any, next: any) => {
  try {
    const authHeader: string = req.headers["authorization"];
    const token: string = authHeader && authHeader.split(" ")[1];
    if (token == null || !authHeader?.startsWith("Bearer"))
      throw new Error("No token present");
    jwt.verify(token, config.SECRET_KEY, async (err: any, user: any) => {
      if (err) throw new Error("Invalid token");
      console.log(user);
      req.user = user;
      return next();
    });
  } catch (error: any) {
    return res.status(403).send(error.message);
  }
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

const jwtParse = (token: string) => {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
};
