import { Express } from "express";
import catchAsync from "../utils/catchAsync";
import { authenticateToken } from "../middleware/authentication";
import { LeaderboardController } from "../controllers/leaderboard.controller";

export const leaderboardRoutes = (app: Express): void => {
    app.route("/leaderboard").get(authenticateToken, catchAsync(LeaderboardController.getLeaderboard));
};