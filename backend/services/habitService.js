import pool from "../config/db.js";

export async function getHabitCategories() {
  const [rows] = await pool.query(`
    SELECT * FROM habitCategories`);
  return rows;
}

export async function getPresetHabits(categoryId) {
  const [rows] = await pool.query(`
    SELECT h.id, h.title, c.id, c.name AS categoryName
    FROM habits h
           LEFT JOIN habitCategories c ON h.categoryId = c.id
    WHERE h.categoryId = ?;`,[categoryId]);
  return rows;
}

export async function getUserHabits(userId) {
  const [rows] = await pool.query(`
    SELECT
      uh.id AS userHabitId,
      COALESCE(uh.customTitle, h.title) AS habitTitle,
      uh.priority,
      uh.startDate,
      uh.goalDate,
      uh.frequency,
      uh.isArchived
    FROM userHabits uh
    LEFT JOIN habits h ON uh.habitId = h.id
    WHERE uh.userId = ?;`, [userId]);
  return rows;
}

export async function createHabitByUser(userId, habitId, customTitle, priority, startDate, goalDate,frequency){

  // Insert into userHabits as custom habit
  const [result] = await pool.query(
      `INSERT INTO userHabits
     (userId, habitId, customTitle, priority, startDate, goalDate, frequency)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, habitId, customTitle, priority, startDate, goalDate, frequency]
  );

  const userHabitId = result.insertId;

  // Return inserted record
  const [rows] = await pool.query(
      `SELECT
         uh.id AS userHabitId,
         COALESCE(uh.customTitle, h.title) AS habitTitle,
         uh.priority,
         uh.startDate,
         uh.goalDate,
         uh.frequency,
         uh.isArchived
       FROM userHabits uh
              LEFT JOIN habits h ON uh.habitId = h.id
       WHERE uh.id = ?;`, [userHabitId]);
  return rows[0];

}

/*export async function deleteHabitByUser (userId, userHabitId) {

}*/

/* import { pipeline, env } from '@huggingface/transformers';

class MyClassificationPipeline {
  static task = 'text-generation';
  static model = 'TinyLlama-1.1B-Chat-v1.0-onnx';
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      // NOTE: Uncomment this to change the cache directory
      env.cacheDir = './.cache';
      env.localModelPath = './.models';
      env.allowRemoteModels = false;
      this.instance = pipeline(this.task, this.model, { progress_callback });
    }

    return this.instance;
  }
}

const pipe = await pipeline("text-generation", "TinyLlama/TinyLlama-1.1B-Chat-v1.0");
*/

export async function getTaskRecommendations(conn, callback) {
  /*console.log("get task recommendations from TinyLlama");
  const classifier = await MyClassificationPipeline.getInstance();
  const result = await classifier(text);*/
  callback(result);
}
