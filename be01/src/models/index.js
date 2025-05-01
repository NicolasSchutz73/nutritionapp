const { Sequelize } = require('sequelize');

// Configure ici tes infos de connexion MySQL
const sequelize = new Sequelize('nutritionapp_db', 'admin', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;
