import { Router } from "express";
import registerUser from "../handlers/user/registerUser.js";
import loginUser from "../handlers/user/loginUser.js";
import deleteUserId from "../handlers/user/deleteUserId.js";
import deleteUser from "../handlers/user/deleteUser.js";
import getUsername from "../handlers/user/getUsername.js";
import getAllUsernames from "../handlers/user/getAllUsernames.js"

const userRoutes = Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);

userRoutes.delete("/delete/:id", deleteUserId);
userRoutes.delete("/delete", deleteUser);

userRoutes.get("/username/:username", getUsername);
userRoutes.get("/usernames", getAllUsernames);


export default userRoutes;