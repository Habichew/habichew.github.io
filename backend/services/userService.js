// import db from "../config/db_old.js";
import bcrypt from "bcrypt";
import {pool} from "../config/db.js";

export async function updateUserTaskLastCompleted(userId) {
  const [rows] = await pool.query('UPDATE `users` SET taskLastCompleted = current_timestamp WHERE id = ?', [userId]);
  return rows;
}

export async function getAllUsers() {
  const [rows] = await pool.query('SELECT * FROM users');
  return rows;
}

export async function createUser(username, email, password) {
  // check if the email is occupied
  const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
  if (existing.length > 0) return null;

  // encrypt the password (hash)
  const hashedPassword = await bcrypt.hash(password, 10);

  // insert user into database
  const [result] = await pool.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
  );

  return {
    id: result.insertId,
    username,
    email
  };
}


export async function findUserByEmail(email) {
  const [result] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email]);
  return result;
}

export async function findUserById(id) {
  const [result] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return result[0];
}

export async function getUserById(id, field) {
  const query = `SELECT ${field} FROM users WHERE id = ?`;
  const [rows] = await pool.execute(query, [id]);
  if (rows.length === 0) throw new Error('User not found');
  return rows[0][field];
}

export async function updateUserById(id, field, value) {
  const query = `UPDATE users SET ${field} = ? WHERE id = ?`;
  await pool.execute(query, [value, id]);
  return {
    message: `${field} updated successfully`,
    [field]: value
  }
}

export async function updateUser(userId, updatedFields) {
  const fields = [];
  const values = [];

  for (const [key, value] of Object.entries(updatedFields)) {
    fields.push(`${key} = ?`);
    values.push(value);
  }

  const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
  values.push(userId); // user ID at the end

  const [result] = await pool.query(sql, values);
  return result;
}

export async function updateProfileImage(conn, userId, profileImage, callback) {
  console.log(conn);
  const result = await conn.query(
    `UPDATE users
    SET profileImage = ?
    WHERE id = ?`,
    [profileImage, userId]
  );
  callback(result);
}

export async function deleteUser(userId) {
  const [result] = await pool.query('DELETE FROM users WHERE id = ?', [userId]);
  return result;
}
