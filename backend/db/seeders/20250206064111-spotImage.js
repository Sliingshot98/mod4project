'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate ([
      {
        spotId: 1,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrFolb08nliBZLgvjEuKmZD-nYogZVN1OWMw&s",
        preview: "true",
        
      }

    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options, {}, {});
  }};

