/*
import express from "express";
import * as planetController from "../controllers/planetController.js";

import { connect } from "../app.js";

export const planetRouter = express.Router();

planetRouter.get("/", (req, res) => {
  connect((conn) => planetController.getAllPlanets(conn, req, res));
});

planetRouter.get("/name/:name", (req, res) => {
  connect((conn) => planetController.findItinerariesByName(conn, req, res));
});

planetRouter.get("/user/:userId", (req, res) => {
  connect((conn) =>
    planetController.findItinerariesByUserId(conn, req, res)
  );
});

planetRouter.get("/:itineraryId", (req, res) => {
  connect((conn) => planetController.findItinerariesById(conn, req, res));
});

planetRouter.put("/:itineraryId", (req, res) => {
  connect((conn) => planetController.updateItinerary(conn, req, res));
});

planetRouter.post("/:userId", (req, res) => {
  connect((conn) => planetController.createItinerary(conn, req, res));
});

planetRouter.delete("/:itineraryId", (req, res) => {
  connect((conn) => planetController.deleteItinerary(conn, req, res));
});
*/
