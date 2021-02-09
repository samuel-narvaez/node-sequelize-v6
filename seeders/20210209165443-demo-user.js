'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users',[{
      name: 'User 1',
      email: 'user1@correo.com',
      password: 123456,
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
