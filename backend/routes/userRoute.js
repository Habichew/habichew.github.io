import express from "express";
const userRouter = express.Router();
import * as userController from "../controllers/userController.js";
import {getAllUsers} from "../services/userService.js";
import * as petController from "../controllers/petController.js";
import * as taskController from "../controllers/taskController.js";
import * as userHabitController from "../controllers/userHabitController.js";

// Get all users's information
userRouter.get("/", userController.getAllUsers);

// Auth: Login, Register
userRouter.post("/login", userController.findUser);

userRouter.post("/signup", userController.signUp);

// Profile by user id
userRouter.get("/:userId", userController.findUserById);

userRouter.get("/:userId/email", userController.findEmailById);

userRouter.get("/:userId/password", userController.findPasswordById);

userRouter.get("/:userId/username", userController.findUsernameById);

userRouter.get("/:userId/profileImage", userController.findProfileImageById);

userRouter.put("/:userId", userController.updateUser);

userRouter.put("/:userId/email", userController.updateEmailById);

userRouter.put("/:userId/password", userController.updatePasswordById);

userRouter.put("/:userId/username", userController.updateUsernameById);

/*userRouter.put("/:userId/profileImage", userController.updateProfileImageById);*/

userRouter.delete("/:userId", userController.deleteUser);

/* User Pets */
// Find pet by user id
userRouter.get("/:userId/pet", petController.findPetByUserId);

// Create pet
userRouter.post("/:userId/pet", petController.createPet);

// Update pet
userRouter.put("/:userId/pet", petController.updatePet);

// Delete pet
userRouter.delete("/:userId/pet", petController.deletePet);

/* User Tasks */
// Get tasks by user id
userRouter.get("/:userId/tasks", (req, res) => {
    connect((conn) =>
        taskController.findTaskByUserId(conn, req, res)
    );
});

/* User Habits */
// Add habit to user
userRouter.post("/:userId/habits", (req, res) => {
    connect((conn) =>
        userHabitController.createUserHabit(conn, req, res)
    );
});

// Update user habit
userRouter.put("/:userId/habits", (req, res) => {
    connect((conn) =>
        userHabitController.updateUserHabit(conn, req, res)
    );
});

// Delete user habit
userRouter.delete("/:userId/habits", (req, res) => {
    connect((conn) =>
        userHabitController.deleteUserHabit(conn, req, res)
    );
});

export {userRouter};