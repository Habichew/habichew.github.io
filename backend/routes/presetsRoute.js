import express from "express";
const presetsRouter = express.Router();

import * as habitController from "../controllers/habitController.js";
import * as taskController from "../controllers/taskController.js";


// Get all habit categories
presetsRouter.get('/categories', habitController.getHabitCategories)

// Get all preset habits under a given category
presetsRouter.get('/categories/:categoryId/habits/', habitController.getPresetHabits);

// Get preset tasks by a preset habit Id
presetsRouter.get('/habits/:habitId/tasks', taskController.getPresetTasks);


export {presetsRouter};