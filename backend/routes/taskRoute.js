import express from "express";
import * as taskController from "../controllers/taskController.js";

export const taskRouter = express.Router();

// Get preset tasks
taskRouter.get('/presets', taskController.getPresetTasks);

// Get preset tasks by id
taskRouter.get('/presets/:habitId', taskController.getPresetTasksByHabitId);

// For testing: Get all tasks
taskRouter.get("/", taskController.getAllTasks);

// Get task by id
taskRouter.get("/:taskId", taskController.findTaskById);

// Create task
taskRouter.post("/", taskController.createTask);

// Update task by id
taskRouter.put("/:taskId", taskController.updateTask);

// Delete task
taskRouter.delete("/:taskId", taskController.deleteTask);