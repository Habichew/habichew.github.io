import express from "express";
import * as itineraryTypeController from "../controllers/userHabitController.js";

import { connect } from "../index.js";

export const taskRouter = express.Router();

taskRouter.get("/", (req, res) => {
  connect((conn) =>
    itineraryTypeController.getAllItineraryTypes(conn, req, res)
  );
});

taskRouter.get("/:id", (req, res) => {
  connect((conn) =>
    itineraryTypeController.findItineraryTypeById(conn, req, res)
  );
});
