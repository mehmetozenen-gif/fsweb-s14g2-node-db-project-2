
exports.seed = async function (knex) {
  await knex('cars').del();

  await knex('cars').insert([
    {
      vin: '1HGCM82633A004352',
      make: 'Honda',
      model: 'Accord',
      mileage: 125000,
      title: 'clean',
      transmission: 'automatic',
    },
    {
      vin: '1M8GDM9AXKP042788',
      make: 'MCI',
      model: 'Motorcoach',
      mileage: 85000,
      title: 'clean',
      transmission: 'manual',
    },
  ]);
};
