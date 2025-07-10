const db = require('../db');

const getTodosByUser = async (userId) => {
  const [rows] = await db.query(
    'SELECT id, text, completed, created_at FROM todos WHERE user_id = ? ORDER BY created_at DESC',
    [userId]
  );
  return rows;
};

const createTodo = async (userId, text) => {
  const [result] = await db.query(
    'INSERT INTO todos (user_id, text) VALUES (?, ?)',
    [userId, text]
  );
  const [rows] = await db.query('SELECT id, text, completed, created_at FROM todos WHERE id = ?', [result.insertId]);
  return rows[0];
};

const updateTodo = async (id, text, completed) => {
  await db.query('UPDATE todos SET text = ?, completed = ? WHERE id = ?', [text, completed, id]);
  const [rows] = await db.query('SELECT id, text, completed, created_at FROM todos WHERE id = ?', [id]);
  return rows[0];
};

const deleteTodo = async (id) => {
  await db.query('DELETE FROM todos WHERE id = ?', [id]);
};

const findTodoByIdAndUser = async (id, userId) => {
  const [rows] = await db.query('SELECT * FROM todos WHERE id = ? AND user_id = ?', [id, userId]);
  return rows[0];
};

module.exports = { getTodosByUser, createTodo, updateTodo, deleteTodo, findTodoByIdAndUser };
