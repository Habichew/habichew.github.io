import express from "express";
const userRouter = express.Router();
import * as userController from "../controllers/userController.js";
import {getAllUsers} from "../services/userService.js";


userRouter.get("/", userController.getAllUsers);

/*userRouter.get("/profileName/:profileName", (req, res) => {
  pool((conn) => userController.findUserByUsername(conn, req, res));
});

userRouter.get("/:userId", (req, res) => {
  pool((conn) => userController.findUserById(conn, req, res));
});

userRouter.post("/login", (req, res) => {
  pool((conn) => userController.findUser(conn, req, res));
});

userRouter.post("/signup", (req, res) => {
  pool((conn) => userController.createUser(conn, req, res));
});

userRouter.post("/:userId/newsletter", (req, res) => {
  pool((conn) => userController.subscribeUserToNewsletter(conn, req, res));
});

userRouter.put("/:userId", (req, res) => {
  pool((conn) => userController.updateUser(conn, req, res));
});

userRouter.delete("/:userId", (req, res) => {
  pool((conn) => userController.deleteUser(conn, req, res));
});*/

export {userRouter};