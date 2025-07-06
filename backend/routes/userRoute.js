import express from "express";
const userRouter = express.Router();
import * as userController from "../controllers/userController.js";
import {getAllUsers} from "../services/userService.js";
import * as petController from "../controllers/petController.js";
import * as taskController from "../controllers/taskController.js";
import {connect} from "../index.js";
import * as userHabitController from "../controllers/userHabitController.js";

// Get all users's information
userRouter.get("/", userController.getAllUsers);

// Auth: Login, Register
userRouter.post("/login", userController.findUser);

userRouter.post("/signup", userController.signUp);

// Profile by user id
userRouter.get("/:userId", userController.findUserById);

userRouter.put("/:userId", userController.updateUser);

userRouter.delete("/:userId", userController.deleteUser);

/*
userRouter.get("/profileName/:profileName", (req, res) => {
  pool((conn) => userController.findUserByUsername(conn, req, res));
});
*/

/* User Pets */
// Find pet by user id
userRouter.get("/:userId/pet", (req, res) => {
    connect((conn) => petController.findPetByUserId(conn, req, res));
})

// Create pet
userRouter.post("/:userId/pet", (req, res) => {
    connect((conn) => petController.createPet(conn, req, res));
})

// Update pet
userRouter.put("/:userId/pet", (req, res) => {
    connect((conn) => petController.updatePet(conn, req, res));
})

// Delete pet
userRouter.delete("/:userId/pet", (req, res) => {
    connect((conn) => petController.deletePet(conn, req, res));
})

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