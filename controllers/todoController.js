const todoModel = require('../models/todoModel');

exports.getTodos = async (req, res) => {
  try {
    const todos = await todoModel.getTodosByUser(req.user.id);
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.createTodo = async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: 'Text wajib diisi' });
  try {
    const todo = await todoModel.createTodo(req.user.id, text);
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  try {
    const todo = await todoModel.findTodoByIdAndUser(id, req.user.id);
    if (!todo) return res.status(404).json({ message: 'Todo tidak ditemukan' });
    const updated = await todoModel.updateTodo(id, text ?? todo.text, completed ?? todo.completed);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await todoModel.findTodoByIdAndUser(id, req.user.id);
    if (!todo) return res.status(404).json({ message: 'Todo tidak ditemukan' });
    await todoModel.deleteTodo(id);
    res.json({ message: 'Todo dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
