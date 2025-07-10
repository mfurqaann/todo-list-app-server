require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
app.use(express.json());
app.use(cors());

app.use(authRoutes);
app.use('/todos', todoRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('Server berjalan di port', PORT);
});
