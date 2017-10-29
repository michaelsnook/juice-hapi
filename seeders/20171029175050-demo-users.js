'use strict';

const uuidv4 = require('uuid/v4');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [
        {
          id: uuidv4(),
          name: 'Kaushal',
          email: 'kaushal@juiceplace.com',
          phone: '+91 55555 12345'
        },
        {
          id: uuidv4(),
          name: 'Arya',
          email: '',
          phone: '+1 555 1234567'
        },
        {
          id: uuidv4(),
          name: 'Jorah',
          email: 'jm@example.org',
          phone: '+1 5555555555'
        },
        {
          id: uuidv4(),
          name: 'Uhura',
          email: '',
          phone: '+43 55123 55123'
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Users', null, {});
    */
  }
};
