import express from "express";
const userRouter = express.Router();
import * as userController from "../controllers/userController.js";
import {getAllUsers} from "../services/userService.js";

// Get all users's information
userRouter.get("/", userController.getAllUsers);

// Auth: Login, Register
userRouter.post("/login", userController.findUser);

userRouter.post("/signup", userController.signUp);

// Profile by user id
userRouter.get("/:userId", userController.findUserById);

userRouter.put("/:userId", userController.updateUser);

userRouter.delete("/:userId", userController.deleteUser);

/*userRouter.get("/profileName/:profileName", (req, res) => {
  pool((conn) => userController.findUserByUsername(conn, req, res));
});

*/

export {userRouter};