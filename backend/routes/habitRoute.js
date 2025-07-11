import express from "express";
const habitRouter = express.Router();

import * as userController from "../controllers/userController.js";
import * as habitController from "../controllers/habitController.js";
import * as petController from "../controllers/petController.js";
import * as taskController from "../controllers/taskController.js";
import * as userHabitController from "../controllers/userHabitController.js";


// Get all habits
habitRouter.get("/", habitController.getAllHabits);

// Get all habit categories
/*habitRouter.get("/categories", habitController.getAllHabitCategories);*/

export {habitRouter};