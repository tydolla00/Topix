import games from "./games";
import protectedResources from "./protected";
import { Express } from "express";
import users from "./users";

const mountRoutes = (app: Express) => {
  app.use("/api/games", games);
  app.use("/api/auth", protectedResources);
  app.use("/api/users", users);
};
export default mountRoutes;
