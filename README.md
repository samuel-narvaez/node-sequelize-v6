# node-sequelize-v6

# installar globalmente en la maquina sequelize
npm install sequelize-cli -g

# Config sequelize y express con node y mysql
npm i --save sequelize mysql2 sequelize-cli express body-parser

# Crear los archivos necesarios en proyecto (crea => model , seed , config, migrations )
npx sequelize-cli init

# Migration Sequelize estructura
# Ejemplo
->sequelize model:generate --name Post --attributes title:string,content:text,imageUrl:string,categoryId:integer,userId:integer

->sequelize model:generate --name User --attributes name:string,email:string,password:string

->sequelize model:generate --name Category --attributes name:string

->sequelize model:generate --name Comment --attributes content:text,postId:intenger,userId:integer


# subir los modelos a la DB
sequelize db:migrate

# eliminar los modelos en la DB
sequelize db:migrate:undo:all

/-----------------------------------------------------/

# Create un Seed
npx sequelize-cli seed:generate --name demo-user
# Ejemplo de un Seed

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


# Subir un Seed
npx sequelize-cli db:seed:all

# Subir Seed especificio
npx sequelize-cli db:seed --seed demo

# Para hacer Realaciones entre tablas

sequelize migration:generate --name name

# Ejemplo Relaciones

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Posts', // name of Source model
      'userId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Posts', // name of Source model
      'userId' // key we want to remove
    );
  }
};
