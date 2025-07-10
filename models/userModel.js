const db = require('../db');

const findByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

const findById = async (id) => {
  const [rows] = await db.query('SELECT id, email FROM users WHERE id = ?', [id]);
  return rows[0];
};

const createUser = async (email, hashedPassword) => {
  await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
};

module.exports = { findByEmail, findById, createUser };
