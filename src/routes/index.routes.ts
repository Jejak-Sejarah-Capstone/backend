import { Express } from "express";
import { IndexController } from "../controllers/index.controller";

export const router = (app: Express): void => {
    // Root route
    app.route("/").get(IndexController.index);

    // // Routes Tambahan untuk resource lain
    // userRoutes(app);

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
