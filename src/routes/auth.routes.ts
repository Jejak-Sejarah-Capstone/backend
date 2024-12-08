import { Express } from "express";
import { AuthController } from "../controllers/auth.controller";
import catchAsync from "../utils/catchAsync";
import { authenticateToken } from "../middleware/authentication";

export const authRoutes = (app: Express): void => {
    app.route("/signup").post(catchAsync(AuthController.signup));
    app.route("/protected").get(authenticateToken, (req: any, res) => {
        res.status(200).json({
            message: "This is a protected route",
            user: req.user, 
        });
    });
};