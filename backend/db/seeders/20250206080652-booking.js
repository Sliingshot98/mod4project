'use strict';

const { Booking } = require('../models');

let options= {};
if (process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA
}
module.exports = {
  async up (queryInterface, Sequelize) {
   await Booking.bulkCreate([
    {
      spotId: 1,
      userId: 1,
      startDate: new Date(),
      endDate: "2025-02-06T08:12:00.000Z"
    },
    {
      spotId: 1,
      userId: 1,
      startDate: "2025-02-02T08:12:00.000Z",
      endDate: "2025-02-06T08:12:00.000Z"
    }
   ])
  },

  async down (queryInterface, Sequelize) {
   options.tableName = 'Bookings';
   return queryInterface.bulkDelete(options, {}, {})
  }
};
