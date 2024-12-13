import { Express } from "express";
import { IndexController } from "../controllers/index.controller";
import { authRoutes } from "./auth.routes";
import errorHandler from "../handler/errorHandler";
import { leaderboardRoutes } from "./leaderboard.routes";

export const router = (app: Express): void => {
    // Root route
    app.route("/").get(IndexController.index);

    authRoutes(app);
    leaderboardRoutes(app);

    app.use(errorHandler);
    // Fallback route
    app.use(IndexController.fallback);
};

// Contoh routes untuk resource lain
// src/routes/user.routes.ts
// import { Express } from "express";
// import { UserController } from "../controllers/user.controller";

// export const userRoutes = (app: Express): void => {
//     app.route("/users")
//         .get(UserController.getAllUsers)
//         .post(UserController.createUser);

//     app.route("/users/:id")
//         .get(UserController.getUserById)
//         .put(UserController.updateUser)
//         .delete(UserController.deleteUser);
// };
