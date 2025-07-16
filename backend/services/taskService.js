import {pool} from "../config/db.js";

export async function getPresetTasks() {
    const [row] = await pool.query(`SELECT *
                                  FROM tasks`);
    return row;
}

export async function getPresetTasksByHabitId(habitId) {
    const [row] = await pool.query(`SELECT *
                                  FROM tasks
                                  WHERE id = ?`, [habitId]);
    return row;
}

export async function getTasksByUserId(userId) {
    const [row] = await pool.query(`SELECT *
                                    FROM habits
                                    JOIN userTasks
                                    ON habits.id = userTasks.habitId
                                    WHERE habits.id = ?`, [userId]);
    return row;
}

export async function getAllTasks() {
    const [rows] = await pool.query('SELECT * FROM userTasks');
    return rows;
}

export async function findTaskById(id) {
    const [row] = await pool.query(`SELECT *
                                    FROM userTasks
                                    WHERE id = ?`, [id]);
    return row;
}

export async function createTask(task) {
    const [row] = await pool.query(
        'INSERT INTO userTasks (title, description, score, priority, habitId, dueAt) VALUES (?, ?, ?, ?, ?, ?)',
        [task.title, task.description, task.score, task.priority, task.habitId, task.dueAt]
    );
    return row;
}

export async function updateTask(id, task) {
    const [row] = await pool.query(
        `UPDATE userTasks
         SET title = ?,
             completed = ?,
             description = ?,
             score = ?,
             priority = ?,
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
            task.habitId,
            task.dueAt,
            id
        ]
    );
    return row;
}

export async function deleteTask(id) {
    const [rows] = await pool.query('DELETE FROM userTasks WHERE id = ?', [id]);
    return rows;
}