import * as habitService from "../services/habitService.js";
import {sendNotImplementedError} from "../app.js";

export async function getHabitCategories(req, res) {
    try {
        const categories = await habitService.getHabitCategories();
        if (categories.length ===0){
            return res.status()
        }
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({message: 'Failed to fetch habit categories', error: err.message});
    }
}

export async function getPresetHabits(req, res) {
    try {
        const { categoryId } = req.query;
        const presets = await habitService.getPresetHabits(categoryId);
        res.status(200).json(presets);
    } catch (err) {
        res.status(500).json({message: 'Failed to fetch preset habits', error: err.message});
    }
}


export async function getHabitByUser(req, res) {
    try {
        const {userId} = req.params;
        const list = await habitService.getUserHabits(userId);
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json({message: 'Failed to fetch user habits', error: err.message});
    }
}

export async function createHabitByUser(req, res) {
    try {
        const { userId } = req.params;
        const { customTitle, priority, startDate, goalDate, frequency } = req.body;

        // Basic validation
        if (!customTitle) {
            return res.status(400).json({ message: 'Habit title are required' });
        }

        const habit = await habitService.createHabitByUser(userId, customTitle, priority, startDate, goalDate, frequency);
        res.status(201).json({ message: 'Habit created', habit });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create habit', error: err.message });
    }
}

export function getTaskRecommendations(conn, req, res) {
    sendNotImplementedError(res);
    /*
    try {
      habitService.getTaskRecommendations(
          conn,
          req.body.habit,
          (result) => {
            if (result.length === 1) {
              res.status(200);
            } else if (result.length === 0) {
              res.status(403);
            }
            res.send(result);
          }
      );
  } catch (code) {
    res.status(code);
    res.send();
  }
  */
}