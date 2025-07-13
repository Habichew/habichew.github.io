import {pool} from "../config/db.js";

export async function getAllMoodTypes() {
    const [result] = await pool.query('SELECT * FROM moodTypes');
    return result;
}

// Get all mood logs for a given user
export async function getMoodLogsByUser(userId) {
    const [rows] = await pool.query(
    `SELECT moodLogs.*, moodTypes.label AS moodLabel
     FROM moodLogs
     JOIN moodTypes ON moodLogs.moodTypeId = moodTypes.id
     WHERE moodLogs.userId = ?
     ORDER BY moodDate DESC`,
        [userId]
    );
    return rows;
}