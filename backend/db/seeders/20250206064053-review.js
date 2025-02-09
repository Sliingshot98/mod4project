'use strict';

const { Review } = require('../models');


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate ([
      {
        spotId: 1,
        userId: 1,
        review: "This a quaint little home in a very safe part of the city"  ,
        stars:  5,   
      }

    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, {}, {});
  }};
