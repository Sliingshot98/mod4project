'use strict';

const { ReviewImage} = require('../models')

let options ={};
if (process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA
}
module.exports = {
  async up (queryInterface, Sequelize) {
   await ReviewImage.bulkCreate([
    {
      reviewId: 1,
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdoVjpLjeX0Cf6dfmYPrYAvc3aQjY8_wQukg&s"
    }
   ], { validate: true});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkDelete(options, {}, {})
  }
};
