import express from "express";
const habitRouter = express.Router();

import * as userController from "../controllers/userController.js";
import * as habitController from "../controllers/habitController.js";
import * as petController from "../controllers/petController.js";
import * as taskController from "../controllers/taskController.js";


// Get all habits
habitRouter.get('/categories', habitController.getHabitCategories)

habitRouter.get('/presets', habitController.getPresetHabits);

habitRouter.get('/:userId', habitController.getHabitListByUser);

habitRouter.get('/:userId/:userHabitId', habitController.getHabitByUser);

habitRouter.post('/:userId', habitController.createHabitByUser);

habitRouter.patch('/:userId/:userHabitId', habitController.updateHabitByUser);

// Get all habit categories
/*habitRouter.get("/categories", habitController.getAllHabitCategories);*/

export {habitRouter};