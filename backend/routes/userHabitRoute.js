/*
import express from "express";
import * as locationController from "../controllers/locationController.js";

import { connect } from "../app.js";

export const userHabitRouter = express.Router();

userHabitRouter.get("/", function (req, res, next) {
  connect((conn) => locationController.getAllLocations(conn, req, res));
});

userHabitRouter.get("/:overpassId", (req, res) => {
  connect((conn) =>
    locationController.findLocationByOverpassId(conn, req, res)
  );
});
*/
