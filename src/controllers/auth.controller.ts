import { Request, Response } from "express";
import { UserSchema } from "../models/User.model";
import { validateForm } from "../utils/validateForm";
import { AuthQuery } from "../queries/Auth.queries";
import { firebaseAdmin } from "../config/firebase";
import CustomError from "../handler/CustomError";

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
};
