// import db from "../config/db_old.js";
import bcrypt from "bcrypt";
import { pool } from "../config/db.js";

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


export async function findEmailPassword(email, password, callback) {

  let result;
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      result = await conn.query(
        `SELECT * FROM users WHERE email = ? AND password = ?`,
        [email, hash]
      );
      callback(result);
    });
  });
}

export async function findUserByEmail(email, callback) {
  const [result] = await pool.query(`SELECT * FROM users WHERE email = ?`,
    [email]);
  callback(result);
}

export async function findUserById(conn, id, callback) {
  console.log(conn);
  const result = await conn.query(`SELECT * FROM users WHERE id = ?`, [id]);
  callback(result);
}

export async function findUserByUsername(conn, profileName, callback) {
  console.log(conn);
  const result = await conn.query(
    `SELECT * FROM users WHERE username LIKE ?`,
    ["%" + profileName + "%"]
  );
  callback(result);
}

export async function updateUser(conn, userId, updatedUser, callback) {
  console.log(conn);
  console.log("updated user:", updatedUser);
  console.log("user id:", userId);
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(updatedUser.password, salt, async function (err, hash) {
      const result = await conn.query(
        `UPDATE users
    SET email = ?, password = ?, profileName = ?, profileImage = ?
    WHERE id = ?`,
        [
          updatedUser.email,
          hash,
          updatedUser.profileName,
          updatedUser.profileImage,
          userId,
        ]
      );
      callback(result);
    });
  });
}

export async function updateProfileName(conn, userId, profileName, callback) {
  console.log(conn);
  const result = await conn.query(
    `UPDATE users
    SET profileName = ?
    WHERE id = ?`,
    [profileName, userId]
  );
  callback(result);
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

export async function deleteUser(conn, userId, callback) {
  console.log(conn);
  const result = await conn.query(
    `DELETE FROM users
    WHERE id = ?`,
    [userId]
  );
  callback(result);
}
