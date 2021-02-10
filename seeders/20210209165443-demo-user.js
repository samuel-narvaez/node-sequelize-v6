'use strict';

const CryptoJS = require("crypto-js");
const crypt = (value) => CryptoJS.AES.encrypt(value, 'secret key 123').toString();


module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users',[{
      name: crypt('Artemisa'),
      email: crypt('Artemisa@correo.com'),
      password: crypt('123456'),
      createdAt: new Date(),
      updatedAt: new Date()
    }],
    {
      returning : true,
      validate : true,
      individualHooks: true
    }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
