import { Request, Response } from "express";
import { UserSchema } from "../models/User.model";
import { validateForm } from "../utils/validateForm";
import { AuthQuery } from "../queries/Auth.queries";
import { firebaseAdmin } from "../config/firebase";
import CustomError from "../handler/CustomError";
import { LeaderboardQuery } from "../queries/Leaderboard.queries";

export const LeaderboardController = {
	async getLeaderboard(req: Request, res: Response) {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ message: "Token is required" });
        }
        try {
            const decodedToken = await firebaseAdmin.auth().verifyIdToken(token); 
			const userId = decodedToken.uid;
			const user = await AuthQuery.getUserByUid(userId);
			const position = await LeaderboardQuery.getPositionById(userId);
            const users = await LeaderboardQuery.get10Leaderboard();
            res.status(200).json({users, user, position});
        } catch (error) {
            console.error("Error getting leaderboard:", error);
            res.status(500).json({ message: "Failed to get leaderboard" });
        }
    }
};
