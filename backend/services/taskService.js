import { pool } from "../config/db.js";

export async function getAllTasks() {
  const [rows] = await pool.query('SELECT * FROM tasks');
  return rows;
}

export async function findTaskById(id) {
  const [row] = await pool.query(`SELECT * FROM tasks WHERE id = ?`, [id]);
  return row;
}

export async function createTask(task) {
    const [row] = await pool.query(
        'INSERT INTO tasks (description, score, level, priority, recommendation, category_id, due_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [task.description, task.score, task.level, task.priority, task.recommendation, task.categoryId, task.dueAt]
    );
    return row;
}

export async function updateTask(id, task) {
  const [row] = await pool.query(
      `UPDATE tasks
                SET description = ?, score = ?, level = ?, priority = ?, recommendation = ?, category_id = ?, due_at = ? 
                WHERE id = ?`,
      [
        task.description,
        task.score,
        task.level,
        task.priority,
        task.recommendation,
        task.categoryId,
          task.dueAt,
          id
      ]
  );
  return row;
}

export async function findItineraryTypeById(conn, id, callback) {
  console.log("find itineraryTypes by id", id);
  const result = await conn.query(
    `SELECT * FROM itineraryTypes WHERE id = (?)`,
    [id]
  );
  callback(result);
}
