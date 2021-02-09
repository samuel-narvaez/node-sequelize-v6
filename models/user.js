'use strict';

const {Model} = require('sequelize');
const CryptoJS = require("crypto-js");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks : {
      beforeCreate : (User) => {        
        // Encrypt
        User.name = CryptoJS.AES.encrypt(User.name, 'secret key 123').toString();
        User.email = CryptoJS.AES.encrypt(User.email, 'secret key 123').toString();
        User.password = CryptoJS.AES.encrypt(User.password, 'secret key 123').toString();
      }
    }
  });
  return User;
};