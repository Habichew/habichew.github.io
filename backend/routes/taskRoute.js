import express from "express";
import * as taskController from "../controllers/taskController.js";

export const taskRouter = express.Router();

// For testing: Get all tasks
taskRouter.get("/", taskController.getAllTasks);

// Get task by id
taskRouter.get("/:taskId", taskController.findTaskById);

// Update task by id
taskRouter.put("/:taskId", taskController.updateTask);

// Delete task
taskRouter.delete("/:taskId", taskController.deleteTask);