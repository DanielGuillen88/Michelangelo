import { Router } from "express";
import registerUser from "../handlers/user/registerUser.js";
import loginUser from "../handlers/user/loginUser.js";
import deleteUserId from "../handlers/user/deleteUserId.js";
import deleteUser from "../handlers/user/deleteUser.js";

const userRoutes = Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.delete("/delete/:id", deleteUserId);
userRoutes.delete("/delete", deleteUser);

export default userRoutes;