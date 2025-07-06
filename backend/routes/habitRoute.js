import express from "express";
import * as habitController from "../controllers/habitController.js";

import { connect } from "../index.js";

export const habitRouter = express.Router();

// Get all habits
habitRouter.get("/", (req, res) => {
    connect((conn) => habitController.getAllHabits(conn, req, res));
});

// Get all habit categories
habitRouter.get("/habits/categories", (req, res) => {
    connect((conn) =>
        habitController.findItinerariesByUserId(conn, req, res)
    );
});

