
const express = require('express');

const server = express();
const carsRouter = require('./cars/cars-router');

server.use(express.json());

// Cars routes
server.use('/api/cars', carsRouter);

// Ana sayfa
server.get('/', (req, res) => {
  res.status(200).json({
    message: 'Cars API is running',
  });
});

// Bilinmeyen endpoint
server.use((req, res) => {
  res.status(404).json({
    message: 'endpoint not found',
  });
});

// Hata yakalama middleware
server.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: 'internal server error',
  });
});

module.exports = server;
