
const express = require('express');
const router = express.Router();

const Cars = require('./cars-model');

const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require('./cars-middleware');

// GET /api/cars
router.get('/', async (req, res, next) => {
  try {
    const cars = await Cars.getAll();

    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
});

// GET /api/cars/:id
router.get(
  '/:id',
  checkCarId,
  (req, res) => {
    res.status(200).json(req.car);
  }
);

// POST /api/cars
router.post(
  '/',
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  async (req, res, next) => {
    try {
      const newCar = await Cars.create(req.body);

      res.status(201).json(newCar);
    } catch (error) {
      next(error);
    }
  }
);

// PUT /api/cars/:id
router.put(
  '/:id',
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  async (req, res, next) => {
    try {
      const updatedCar = await Cars.updateById(
        req.params.id,
        req.body
      );

      res.status(200).json(updatedCar);
    } catch (error) {
      next(error);
    }
  }
);

// DELETE /api/cars/:id
router.delete(
  '/:id',
  checkCarId,
  async (req, res, next) => {
    try {
      const deletedCar = await Cars.deleteById(
        req.params.id
      );

      res.status(200).json(deletedCar);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
