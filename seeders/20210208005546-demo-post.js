'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', [{
      title: 'Prueba',
      content: 'prueba de los seeders',
      imageUrl: 'http://seeders',
      userId: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'Prueba2',
      content: 'prueba2 de los seeders',
      imageUrl: 'http://seeders2',
      userId: '8',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
