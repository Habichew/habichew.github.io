import pool from "../config/db.js";

export async function getHabitById(id) {
  const [row] = await pool.query(`SELECT *
                                  FROM habits
                                  WHERE id = ?`, [id]);
  return row;
}

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

export async function getAllHabits(conn, callback) {
  console.log("get all collaborators");
  const result = await conn.query("SELECT * FROM collaborators");
  callback(result);
}

export async function getTaskRecommendations(conn, callback) {
  /*console.log("get task recommendations from TinyLlama");
  const classifier = await MyClassificationPipeline.getInstance();
  const result = await classifier(text);*/
  callback(result);
}

export async function getHabitCategories(
  conn,
  itineraryId,
  callback
) {
  console.log("find collaborators by itinerary_id", itineraryId);
  const result = await conn.query(
    `SELECT * FROM collaborators WHERE itinerary_id = (?)`,
    [itineraryId]
  );
  callback(result);
}

export async function findItinerariesByCollaboratorUserId(
  conn,
  userId,
  callback
) {
  console.log("find collaborators by user_id", userId);
  const result = await conn.query(
    `SELECT * FROM collaborators WHERE user_id = (?)`,
    [userId]
  );
  callback(result);
}
