import Router from "express-promise-router";
import { Router as ExpressRouter } from "express";
import { queryNoCall as query } from "../db/db";
import { Contact, User } from "../models/types";

const router: ExpressRouter = new (Router as any)();
export default router;

router.get("/", async (req, res) => {
  const queryResult = await query("SELECT * FROM USERS");
  const users: User[] = queryResult.rows;
  return res.send(users);
});

router.get("/contact", async (req, res) => {
  try {
    const contact: Contact = {
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
    };
    await query(
      "INSERT INTO CONTACT(first_name,last_name, email,subject, email) VALUES($1,$2,$3,$4,$5)",
      Object.values(contact)
    );
    return res.send("Your response has been submitted!");
  } catch (error) {
    res.status(500).send("Oops, something unexpected happened.");
  }
});
