import games from "./games";
import protectedResources from "./protected";
import { Express } from "express";

const mountRoutes = (app: Express) => {
  app.use("/games", games);
  app.use("/auth", protectedResources);
};
export default mountRoutes;
