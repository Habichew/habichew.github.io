import { pool } from "../config/db.js";


export async function getAllPets() {
  const [result] = await pool.query('SELECT * FROM pets');
  return result;
}


export async function findPetById(petId) {
  const [result] = await pool.query('SELECT * FROM pets WHERE id = ?', [petId]);
  return result;
}

export async function createPet(pet) {
  const [row] = await pool.query(
      'INSERT INTO pets (name, mood, personality, level, hunger) VALUES (?, ?, ?, ?, ?)',
      [pet.name, pet.mood, pet.personality, pet.level, pet.hunger]
  );
  return row;
}

export async function updatePet(id, pet) {
  const [row] = await pool.query(
      `UPDATE pets
         SET name = ?,
             mood = ?,
             personality = ?,
             level = ?,
             hunger = ?
         WHERE id = ?`,
      [
        pet.name,
        pet.mood,
        pet.personality,
        pet.level,
        pet.hunger,
        id
      ]
  );
  return row;
}

export async function deletePet(id) {
  const [rows] = await pool.query('DELETE FROM pets WHERE id = ?', [id]);
  return rows;
}

export async function deleteEvent(conn, id, callback) {
  console.log("deleting event", id);
  const result = await conn.query(
    `DELETE FROM events
      WHERE overpass_id = ?`,
    [id]
  );
  callback(result);
}

