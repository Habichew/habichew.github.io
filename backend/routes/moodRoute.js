import express from "express";
const moodRouter = express.Router();
import * as moodController from "../controllers/moodController.js";

// ===================== User Mood Logs =================== //

// Fetch all mood types
moodRouter.get('/', moodController.getAllMoodTypes);

// Fetch all mood logs for a user
moodRouter.get('/:userId', moodController.getMoodLogs);

// Insert mood log by user and date
moodRouter.post('/:userId/:date', moodController.insertMoodLog);

// Update mood log by user and date
moodRouter.put('/:userId/:date', moodController.updateMoodLog);

// Delete mood log by user and date
moodRouter.delete('/:userId/:date', moodController.deleteMoodLog);

export {moodRouter};