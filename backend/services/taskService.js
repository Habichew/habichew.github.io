import {pool} from "../config/db.js";
import result from "mysql/lib/protocol/packets/OkPacket.js";

export async function getPresetTasks(habitId) {
    const [row] = await pool.query(
        `SELECT id as taskId, title, habitId, description FROM tasks 
         WHERE habitId=?`,
        [habitId]);
    return row;
}


export async function getTaskListByUserId(userId) {
    const [row] = await pool.query(`
        SELECT
            uh.id AS userHabitId,
            ut.id AS userTaskId,
            COALESCE(ut.customTitle, t.title) AS taskTitle,
            ut.description,
            ut.completed,
            ut.credit,
            ut.priority,
            ut.dueAt,
            ut.createdAt
        FROM userTasks ut
                 JOIN userHabits uh ON ut.userHabitId = uh.id
                 LEFT JOIN tasks t ON ut.taskId = t.id
        WHERE uh.userId = ?`, [userId]);
    return row;
}

export async function findUserTaskById(userTaskId) {
    const [row] = await pool.query(`
        SELECT
            ut.userHabitId,
            ut.id AS userTaskId,
            COALESCE(ut.customTitle, t.title) AS taskTitle,
            ut.description,
            ut.completed,
            ut.credit,
            ut.priority,
            ut.dueAt
        FROM userTasks ut
                 LEFT JOIN tasks t ON ut.taskId = t.id
        WHERE ut.id = ?`, [userTaskId]);
    return row[0];
}

export async function createTask({
                                     taskId,
                                     customTitle,
                                     userHabitId,
                                     description,
                                     priority,
                                     dueAt,
                                     credit
                                 }) {
    // verify if the object task is legal
    if (!userHabitId) throw new Error("userHabitId is required");

    const [result] = await pool.query(`
    INSERT INTO userTasks (taskId, customTitle, userHabitId, description, priority, dueAt, credit)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [taskId || null, customTitle || null, userHabitId, description, priority, dueAt, credit]
    );

    return result.insertId;
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

export async function deleteTask(userTaskId) {
    const [result] = await pool.query('DELETE FROM userTasks WHERE id = ?', [userTaskId]);
    return result.affectedRows > 0;
}