import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserSchema } from "../models/User.model";
import { validateForm } from "../utils/validateForm";
import { UserQuery } from "../queries/user.queries";

export const AuthController = {
  async signup(req: Request, res: Response) {
    const userData = validateForm(req.body, UserSchema, res, "Failed signup");
    if (!userData) return;

      const emailExists = await UserQuery.findUserByEmail(userData.email);
      if (!emailExists) {
        res.status(400).json({ message: "Email already registered" });
        return;
      }

      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const userId = await UserQuery.createUser({
        email: userData.email,
        password: hashedPassword,
        name: userData.name,
        createdAt: new Date(),
      });

      res.status(201).json({
        id: userId,
        email: userData.email,
        name: userData.name,
        createdAt: new Date(),
      });
    }
};
