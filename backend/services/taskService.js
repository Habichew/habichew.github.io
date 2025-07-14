import {pool} from "../config/db.js";

export async function getAllTasks() {
    const [rows] = await pool.query('SELECT * FROM tasks');
    return rows;
}

export async function findTaskById(id) {
    const [row] = await pool.query(`SELECT *
                                    FROM tasks
                                    WHERE id = ?`, [id]);
    return row;
}

export async function createTask(task) {
    const [row] = await pool.query(
        'INSERT INTO tasks (title, description, score, level, priority, recommendation, categoryId, habitId, dueAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [task.title, task.description, task.score, task.level, task.priority, task.recommendation, task.categoryId, task.dueAt]
    );
    return row;
}

export async function updateTask(id, task) {
    const [row] = await pool.query(
        `UPDATE tasks
         SET title = ?,
             completed = ?,
             description = ?,
             score = ?,
             priority = ?,
             recommendation = ?,
             categoryId = ?,
             habitId = ?,
             dueAt = ?
         WHERE id = ?`,
        [
            task.title,
            task.completed,
            task.description,
            task.score,
            task.priority,
            task.recommendation,
            task.categoryId,
            task.habitId,
            task.dueAt,
            id
        ]
    );
    return row;
}

export async function deleteTask(id) {
    const [rows] = await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
    return rows;
}