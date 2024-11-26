import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().optional(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(1, "Name is required"),
  createdAt: z.date().optional(),
});

export type User = z.infer<typeof UserSchema>;
