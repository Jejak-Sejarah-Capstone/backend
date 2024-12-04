import { Express } from "express";
import { AuthController } from "../controllers/auth.controller";
import catchAsync from "../utils/catchAsync";

export const authRoutes = (app: Express): void => {
    app.route("/signup").post(catchAsync(AuthController.signup));
    app.route("/login").post(catchAsync(AuthController.login));
};