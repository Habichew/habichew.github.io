import express from "express";
import * as taskController from "../controllers/taskController.js";

export const taskRouter = express.Router();

// Find tasks by user id
taskRouter.get("/:userId", taskController.getTaskListByUserId);

// Get task by id

// Create task
taskRouter.post("/", taskController.createTask);

// Update task by id
taskRouter.put("/:taskId", taskController.updateTask);

// Delete task
taskRouter.delete("/:taskId", taskController.deleteTask);