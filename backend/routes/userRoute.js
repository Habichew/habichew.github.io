import express from "express";
const userRouter = express.Router();
import * as userController from "../controllers/userController.js";
import * as petController from "../controllers/petController.js";
import * as taskController from "../controllers/taskController.js";


// ============== User Profile Information ================== //
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

// ====================== User Pets ======================= //
// Find pet by user id
userRouter.get("/:userId/pet", petController.findPetByUserId);

// Create pet
userRouter.post("/:userId/pet", petController.createPet);

// Update pet
userRouter.put("/:userId/pet", petController.updatePet);

// Delete pet
userRouter.delete("/:userId/pet", petController.deletePet);

// ====================== User Tasks ======================= //
// Find pet by user id
userRouter.get("/:userId/tasks", taskController.getTasksByUserId);

export {userRouter};