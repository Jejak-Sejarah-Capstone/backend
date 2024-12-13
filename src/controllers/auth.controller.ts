import { Request, Response } from "express";
import { UserSchema } from "../models/User.model";
import { validateForm } from "../utils/validateForm";
import { AuthQuery } from "../queries/Auth.queries";
import { firebaseAdmin } from "../config/firebase";
import CustomError from "../handler/CustomError";
import { LeaderboardQuery } from "../queries/Leaderboard.queries";

export const AuthController = {
	async signup(req: Request, res: Response) {
		const userData = validateForm(req.body, UserSchema, res, "Failed signup");
		if (!userData) return;

		const { email, password, name } = userData;

		const emailExists = await firebaseAdmin
			.auth()
			.getUserByEmail(email)
			.catch(() => null);
		if (emailExists) {
			return res.status(400).json({ message: "Email already registered" });
		}
		const userRecord = await AuthQuery.createUser({ email, name, password });

		res.status(201).json({
			id: userRecord.uid,
			email: userRecord.email,
			name: userRecord.displayName,
			createdAt: new Date(),
		});
	},

	async getUserByToken(req: Request, res: Response) {
		const token = req.body.token; 

		if (!token) {
			return res.status(400).json({ error: "Token is required" }); 
		}

		try {
			const decodedToken = await firebaseAdmin.auth().verifyIdToken(token); 
			const userId = decodedToken.uid;
			const user = await AuthQuery.getUserByUid(userId);
			const position = await LeaderboardQuery.getPositionById(userId);
			res.status(200).json({ user, position }); 
		} catch (error) {
			return res.status(403).json({ error: "Invalid token" });
		}
	},
};
