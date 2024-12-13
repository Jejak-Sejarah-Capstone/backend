import { Express } from "express";
import { AuthController } from "../controllers/auth.controller";
import catchAsync from "../utils/catchAsync";
import { authenticateToken } from "../middleware/authentication";
import { PredictController } from "../controllers/predict.controller";

export const predictRoutes = (app: Express): void => {
    app.route("/predict").get(catchAsync(PredictController.predict));
};