
const db = require('../../data/db-config');

// GET ALL - ID'ye göre sıralı
function getAll() {
  return db('cars').orderBy('id', 'asc');
}

// GET BY ID
function getById(id) {
  return db('cars')
    .where({ id })
    .first();
}

// GET BY VIN
function getByVin(vin) {
  return db('cars')
    .where({ vin })
    .first();
}

// CREATE
async function create(car) {
  const [id] = await db('cars').insert(car);

  return getById(id);
}

// UPDATE
async function updateById(id, changes) {
  const updatedCount = await db('cars')
    .where({ id })
    .update(changes);

  if (!updatedCount) {
    return undefined;
  }

  return getById(id);
}

// DELETE
async function deleteById(id) {
  const car = await getById(id);

  if (!car) {
    return undefined;
  }

  await db('cars')
    .where({ id })
    .del();

  return car;
}

module.exports = {
  getAll,
  getById,
  getByVin,
  create,
  updateById,
  deleteById,
};
