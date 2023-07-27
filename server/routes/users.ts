import Router from "express-promise-router";
import { Router as ExpressRouter } from "express";
import { queryNoCall as query } from "../db/db";
import { Users } from "../models/types";

const router: ExpressRouter = new (Router as any)();
export default router;

router.get("/", async (req, res) => {
  const queryResult = await query("SELECT * FROM USERS");
  const users: Users = queryResult.rows;
  return res.send(users);
});
