import { Express } from "express";
import { PredictController } from "../controllers/predict.controller";

export const predictRoutes = (app: Express): void => {
    app.route("/predict").post(PredictController.predict);
}