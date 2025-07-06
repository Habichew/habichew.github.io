import express from "express";
import * as taskController from "../controllers/taskController.js";

import { connect } from "../index.js";

export const taskRouter = express.Router();

// For testing: Get all tasks
taskRouter.get("/", (req, res) => {
  connect((conn) =>
    taskController.getAllTasks(conn, req, res)
  );
});

// Get task by id
taskRouter.get("/:id", (req, res) => {
  connect((conn) =>
      taskController.findTaskById(conn, req, res)
  );
});

// Update task by id
taskRouter.put("/:id", (req, res) => {
  connect((conn) =>
      taskController.updateTask(conn, req, res)
  );
});

// Delete task
taskRouter.delete("/:id", (req, res) => {
  connect((conn) =>
      taskController.deleteTask(conn, req, res)
  );
});