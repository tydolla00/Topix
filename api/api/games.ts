import Router from "express-promise-router";
import { query } from "../db/db";
import { Router as ExpressRouter } from "express";

const router: ExpressRouter = new (Router as any)();
export default router;

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  res.send(`Good Request ${id}`);
});
