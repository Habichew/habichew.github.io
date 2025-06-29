/*
import express from "express";
import * as habitController from "../controllers/habitController.js";

import { connect } from "../app.js";

export const habitRouter = express.Router();

habitRouter.get("/", (req, res) => {
  connect((conn) => habitController.getAllHabits(conn, req, res));
});

collaboratorRouter.get("/:itineraryId", (req, res) => {
  connect((conn) =>
    collaboratorController.findCollaboratorsByItineraryId(conn, req, res)
  );
});

// collaboratorRouter.get("/:userId", (req, res, next) => {
//   connect((conn) =>
//     collaboratorController.findItinerariesByCollaboratorUserId(conn, req, res)
//   );
// });
*/
