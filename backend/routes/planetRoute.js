import express from "express";
import * as planetController from "../controllers/planetController.js";

import { connect } from "../index.js";

export const planetRouter = express.Router();

// Get all Planets
planetRouter.get("/", (req, res) => {
  connect((conn) => planetController.getAllPlanets(conn, req, res));
});

// Find Planet by ID
planetRouter.get("/:planetId", (req, res) => {
  connect((conn) => planetController.findPlanetById(conn, req, res));
});

// Update Planet
planetRouter.put("/:planetId", (req, res) => {
  connect((conn) =>
    planetController.updatePlanet(conn, req, res)
  );
});
