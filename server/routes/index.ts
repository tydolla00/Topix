import games from "./games";
import * as db from "../db/db";

const mountRoutes = (app: any) => {
  app.use("/games", games);
};
export default mountRoutes;
