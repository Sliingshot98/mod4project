'use strict';

const { Spot } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: "1 Canal St",
        city: "New Orleans",
        state: "Louisiana",
        country: "Unites States of America",
        lat: 3.14152965,
        lng: 3.14152965,
        name: "Audubon Aquarium",
        description: "This is aan Aquraium",
        price: 1000,
        
      },
      {
        ownerId: 2,
        address: "42273 Southern Pines blvd",
        city: "Ponchatoula",
        state: "Louisiana",
        country: "United States of America",
        lat: 72.248,
        lng: 125.245,
        name: "Home away from home",
        description: "This home is near the city but far enough to be in the country",
        price: 1500.00,
        
      },
      {
        ownerId: 3,
        address: "1600 Pennsylvania Avenue NW",
        city: "Washington",
        state: "DC",
        country: "United States of America",
        lat: 38.8977,
        lng: -77.036560,
        name: "White House",
        description: "This is Where the president lives",
        price: 10000.00,
        
      },
      {
        ownerId: 4,
        address: "900 ohio drive",
        city: "Washington",
        state: "DC",
        country: "United States of America",
        lat: 38.8813,
        lng: -77.0365,
        name: "Jefferson Memorial",
        description: "This is The jefferson memorial",
        price: 500.00,
       
      },
      {
        ownerId: 5,
        address: "2 lincoln Memorial Cir NW",
        city: "Washington",
        state: "DC",
        country: "United States of America",
        lat: 38.8893,
        lng: -77.0502,
        name: "lincoln Memorial",
        description: "This is the Lincoln Memorial",
        price: 750.25,
       
      },
      {
        ownerId: 6,
        address: "2703 Battleship Pkwy",
        city: "Mobile",
        state: "Alabama",
        country: "United States of America",
        lat: 30.41,
        lng: -88.01,
        name: "USS Alabama",
        description: "This is the USS alabama",
        price: 55.00,
       
      },
      {
        ownerId: 7,
        address: "20403 Co rd 68",
        city: "Robertsdale",
        state: "Alabama",
        country: "United States of America",
        lat: 30.14152965,
        lng: -83.14152965,
        name: "Buc-ee'si",
        description: "This is a buc-ee's",
        price: 800.00,
       
      },
      {
        ownerId: 8,
        address: "615 pere Antonie Alley",
        city: "New Orleans",
        state: "Louisiana",
        country: "United States of America",
        lat: 32.14152965,
        lng: -90.14152965,
        name: "St. Louis Cathedral",
        description: "This is a very old church",
        price: 1200.00,
        
      },
      {
        ownerId: 9,
        address: "1500 sugar Bowl Drive",
        city: "New Orleans",
        state: "Louisiana",
        country: "United States of America",
        lat: 35.14152965,
        lng: -90.14152965,
        name: "Caesars Superdome",
        description: "This is a the home of the New Orleans' saints",
        price: 2800.00,
        
      },
      {
        ownerId: 10,
        address: "6500 Magazine Street",
        city: "New Orleans",
        state: "Louisiana",
        country: "United States of America",
        lat: 38.14152965,
        lng: -80.14152965,
        name: "Audubon Zoo",
        description: "This is a zoo",
        price: 700.00,
       
      },

    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options, {}, {});
  }};
