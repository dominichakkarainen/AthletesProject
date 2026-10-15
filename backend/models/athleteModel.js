const pool = require("../config/db");

const getAllAthletes = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    return await connection.query("SELECT * FROM athletes ORDER BY id DESC");
  } finally {
    if (connection) connection.release();
  }
};

const getAthleteById = async (id) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const rows = await connection.query("SELECT * FROM athletes WHERE id = ?", [
      id,
    ]);
    return rows[0] || null;
  } finally {
    if (connection) connection.release();
  }
};

const createAthlete = async (athlete) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.query(
      `INSERT INTO athletes
            (first_name, last_name, nickname, birth_date, weight, image_url, sport, achievements)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        athlete.first_name,
        athlete.last_name,
        athlete.nickname || null,
        athlete.birth_date || null,
        athlete.weight ?? null,
        athlete.image_url || null,
        athlete.sport || null,
        athlete.achievements || null,
      ],
    );
    return await getAthleteById(result.insertId);
  } finally {
    if (connection) connection.release();
  }
};

const updateAthlete = async (id, athlete) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.query(
      `UPDATE athletes SET
            first_name = ?,
            last_name = ?,
            nickname = ?,
            birth_date = ?,
            weight = ?,
            image_url = ?,
            sport = ?,
            achievements = ?
            WHERE id = ?`,
      [
        athlete.first_name,
        athlete.last_name,
        athlete.nickname || null,
        athlete.birth_date || null,
        athlete.weight ?? null,
        athlete.image_url || null,
        athlete.sport || null,
        athlete.achievements || null,
        id,
      ],
    );

    if (result.affectedRows === 0) return null;
    return await getAthleteById(id);
  } finally {
    if (connection) connection.release();
  }
};

const deleteAthlete = async (id) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.query("DELETE FROM athletes WHERE id = ?", [
      id,
    ]);
    return result.affectedRows > 0;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  getAllAthletes,
  getAthleteById,
  createAthlete,
  updateAthlete,
  deleteAthlete,
};
