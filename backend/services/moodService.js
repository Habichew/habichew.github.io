import {pool} from "../config/db.js";

export async function getAllMoodTypes() {
    const [result] = await pool.query('SELECT * FROM moodTypes');
    return result[0];
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

export async function upsertMoodLog(userId, moodDate, moodTypeId, note) {
    // Check if mood log exists
    const [existing] = await pool.query(
        `SELECT id FROM moodLogs WHERE userId = ? AND moodDate = ?`,
        [userId, moodDate]
    );

    if (existing.length > 0) {
        // Record exists → perform UPDATE
        await pool.query(
            `UPDATE moodLogs
       SET moodTypeId = ?, note = ?, updatedAt = CURRENT_TIMESTAMP
       WHERE userId = ? AND moodDate = ?`,
            [moodTypeId, note, userId, moodDate]
        );
    } else {
        // Record not exists → perform INSERT
        await pool.query(
            `INSERT INTO moodLogs (userId, moodTypeId, note, moodDate)
       VALUES (?, ?, ?, ?)`,
            [userId, moodTypeId, note, moodDate]
        );
    }

    // Return updated mood log with joined label
    const [rows] = await pool.query(
    `SELECT moodLogs.*, moodTypes.label AS moodLabel
     FROM moodLogs
     JOIN moodTypes ON moodLogs.moodTypeId = moodTypes.id
     WHERE moodLogs.userId = ? AND moodLogs.moodDate = ?`,
        [userId, moodDate]
    )
    return rows;
}

export async function deleteMoodLog(userId, moodDate) {
    await pool.query('DELETE FROM moodLogs WHERE userId = ? AND moodDate = ?', [userId, moodDate]);
    const [result] = await pool.query(
        `SELECT * FROM moodLogs WHERE userId = ?`, [userId]
    )
    return result;
}