const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Basic Route for testing
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Job Predict API is running' });
});

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/vacancies', require('./routes/vacancies'));
app.use('/api/applications', require('./routes/applications'));

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  if (process.env.VERCEL) {
    // In Vercel, we don't call app.listen, it's handled by serverless functions
    // We also need to connect to DB
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
    return;
  }

  try {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri);
    console.log(`Connected to In-Memory MongoDB at ${mongoUri}`);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
  }
};

startServer();

module.exports = app;
