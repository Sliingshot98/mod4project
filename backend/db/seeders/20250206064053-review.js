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
      },
      {
        spotId: 2,
        userId: 2,
        review: "This a home is in the country and is safe and quiet",
        stars:  4,  
      },
      {
        spotId: 3,
        userId: 3,
        review: "This place is the seat of power for the entire country"  ,
        stars:  2,  
      },
      {
        spotId: 4,
        userId: 4,
        review: "This the resting place of one of our founding fathers"  ,
        stars:  3,  
      },
      {
        spotId: 5,
        userId: 5,
        review: "This is a memorial of the man who would never tell a lie"  ,
        stars:  2,  
      },
      {
        spotId: 6,
        userId: 6,
        review: "This is a awesome place to bring my kids since they love battlships.",
        stars:  5,  
      },
      {
        spotId: 7,
        userId: 7,
        review: "My kids love comign here when we go out of town."  ,
        stars:  4,  
      },
      {
        spotId: 8,
        userId: 8,
        review: "Beautiful church but sort of in a sketchy part of the city",
        stars:  3,  
      },
      {
        spotId: 9,
        userId: 9,
        review: "Everythign was to expensive here and was not clean."  ,
        stars:  1,  
      },
      {
        spotId: 10,
        userId: 10,
        review: "I love bringing my kids to the zoo here it is always an adventure.",
        stars:  4,  
      },


    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, {}, {});
  }};
