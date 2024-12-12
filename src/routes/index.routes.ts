import { Express } from "express";
import { IndexController } from "../controllers/index.controller";
import { predictRoutes } from "./predict.routes";

export const router = (app: Express): void => {
    // Root route
    app.route("/").get(IndexController.index);

    predictRoutes(app);

    // Fallback route
    app.use(IndexController.fallback);
};


