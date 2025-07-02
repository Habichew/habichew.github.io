import express from "express";
import * as userHabitController from "../controllers/userHabitController.js";

import { connect } from "../index.js";

export const userHabitRouter = express.Router();

userHabitRouter.get("/", function (req, res, next) {
  connect((conn) => userHabitController.getAllUserHabits(conn, req, res));
});

userHabitRouter.get("/:userId", (req, res) => {
  connect((conn) =>
      userHabitController.findUserHabitByUserId(conn, req, res)
  );
});
