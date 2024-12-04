import { Request, Response } from "express";
import { UserSchema } from "../models/User.model";
import { validateForm } from "../utils/validateForm";
import { AuthQuery } from "../queries/Auth.queries";
import { firebaseAdmin } from "../config/firebase";

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

		const token = await AuthQuery.createCustomToken(userRecord.uid);

		res.status(201).json({
			id: userRecord.uid,
			email: userRecord.email,
			name: userRecord.displayName,
			createdAt: new Date(),
			token: token,
		});
	},

	async login(req: Request, res: Response) {
		const { email, password } = req.body;

		if (!email || !password) {
			return res
				.status(400)
				.json({ message: "Email and password are required" });
		}

		const userRecord = await firebaseAdmin.auth().getUserByEmail(email);

		const userDoc = await firebaseAdmin
			.firestore()
			.collection("users")
			.doc(userRecord.uid)
			.get();

		const userData = userDoc.data();

		const token = await firebaseAdmin.auth().createCustomToken(userRecord.uid);

		res.status(200).json({
			message: "Login successful",
			token,
			user: {
				id: userRecord.uid,
				email: userData?.email,
				name: userData?.name,
			},
		});
	},
};
