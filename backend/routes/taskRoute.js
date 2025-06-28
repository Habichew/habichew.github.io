import express from "express";
import * as itineraryTypeController from "../controllers/userHabitController.js";

import { connect } from "../index.js";

export const itineraryTypeRouter = express.Router();

itineraryTypeRouter.get("/", (req, res) => {
  connect((conn) =>
    itineraryTypeController.getAllItineraryTypes(conn, req, res)
  );
});

itineraryTypeRouter.get("/:id", (req, res) => {
  connect((conn) =>
    itineraryTypeController.findItineraryTypeById(conn, req, res)
  );
});
