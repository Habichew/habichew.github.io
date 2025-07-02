import express from "express";
import * as habitController from "../controllers/habitController.js";

import { connect } from "../index.js";

export const habitRouter = express.Router();

habitRouter.get("/", (req, res) => {
  connect((conn) => habitController.getAllHabits(conn, req, res));
});

habitRouter.get("/recommend", (req, res) => {
  connect((conn) => habitController.getTaskRecommendations(conn, req, res));
})

/*habitRouter.get("/:itineraryId", (req, res) => {
  connect((conn) =>
      habitController.findCollaboratorsByItineraryId(conn, req, res)
  );
});*/

// collaboratorRouter.get("/:userId", (req, res, next) => {
//   connect((conn) =>
//     collaboratorController.findItinerariesByCollaboratorUserId(conn, req, res)
//   );
// });
