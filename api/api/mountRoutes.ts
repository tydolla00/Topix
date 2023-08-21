import games from "./games";
import protectedResources from "./protected";
import { Express } from "express";
import users from "./users";

const mountRoutes = (app: Express) => {
  app.use("/games", games);
  app.use("/auth", protectedResources);
  app.use("/api/users", users);
};
export default mountRoutes;
