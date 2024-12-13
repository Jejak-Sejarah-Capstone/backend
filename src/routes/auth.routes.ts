import { Express } from "express";
import { AuthController } from "../controllers/auth.controller";
import catchAsync from "../utils/catchAsync";
import { authenticateToken } from "../middleware/authentication";

export const authRoutes = (app: Express): void => {
    app.route("/signup").post(catchAsync(AuthController.signup));
    app.route("/user").get(authenticateToken, catchAsync(AuthController.getUserByToken));
};