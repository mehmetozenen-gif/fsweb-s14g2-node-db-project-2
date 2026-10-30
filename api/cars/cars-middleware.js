
const Cars = require('./cars-model');
const vinValidator = require('vin-validator');

// 1. Araba ID kontrolü
async function checkCarId(req, res, next) {
  try {
    const car = await Cars.getById(req.params.id);

    if (!car) {
      return res.status(404).json({
        message: `car with id ${req.params.id} not found`,
      });
    }

    req.car = car;
    next();
  } catch (error) {
    next(error);
  }
}

// 2. Zorunlu alan kontrolü
function checkCarPayload(req, res, next) {
  const requiredFields = [
    'vin',
    'make',
    'model',
    'mileage',
  ];

  const body = req.body || {};

  for (const field of requiredFields) {
    if (
      body[field] === undefined ||
      body[field] === null ||
      body[field] === ''
    ) {
      return res.status(400).json({
        message: `${field} is missing`,
      });
    }
  }

  next();
}

// 3. VIN numarası geçerli mi?
function checkVinNumberValid(req, res, next) {
  const { vin } = req.body || {};

  if (!vinValidator.validate(vin)) {
    return res.status(400).json({
      message: `vin ${vin} is invalid`,
    });
  }

  next();
}

// 4. VIN daha önce kullanılmış mı?
async function checkVinNumberUnique(req, res, next) {
  try {
    const { vin } = req.body;

    const existingCar = await Cars.getByVin(vin);

    // PUT işlemlerinde aynı arabanın VIN'i kabul edilir
    if (
      existingCar &&
      String(existingCar.id) !== String(req.params.id)
    ) {
      return res.status(400).json({
        message: `vin ${vin} already exists`,
      });
    }

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
