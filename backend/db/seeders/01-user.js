'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        firstName: 'Corey',
        lastName: 'Calhoon',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Daniel',
        lastName: 'Benetiz',
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Thomthy',
        lastName: 'Saunders',
        email: 'AB@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Craig',
        lastName: 'Johnson',
        email: 'user3@user.io',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password4')
    },
    {
        firstName: 'Harry',
        lastName: 'Potter',
        email: 'user4@user.io',
        username: 'FakeUser4',
        hashedPassword: bcrypt.hashSync('password5')
    },
    {
        firstName: 'Hermione',
        lastName: 'Granger',
        email: 'user5@user.io',
        username: 'FakeUser5',
        hashedPassword: bcrypt.hashSync('password6')
    },
    {
        firstName: 'Ron',
        lastName: 'Weasly',
        email: 'user6@user.io',
        username: 'FakeUser6',
        hashedPassword: bcrypt.hashSync('password7')
    },
    {
        firstName: 'Draco',
        lastName: 'Malfoy',
        email: 'user7@user.io',
        username: 'FakeUser7',
        hashedPassword: bcrypt.hashSync('password8')
    },{
        firstName: 'Severus',
        lastName: 'Snape',
        email: 'user8@user.io',
        username: 'FakeUser8',
        hashedPassword: bcrypt.hashSync('password9')
    },{
        firstName: 'Albus',
        lastName: 'Dumbledore',
        email: 'user9@user.io',
        username: 'FakeUser9',
        hashedPassword: bcrypt.hashSync('password10')
    },

    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users'
    return queryInterface.bulkDelete(options, {},{});
}};
