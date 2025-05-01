const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Meal = sequelize.define('Meal', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  type: { type: DataTypes.ENUM('breakfast', 'lunch', 'dinner', 'snack', 'other'), allowNull: false },
  comment: { type: DataTypes.STRING },
}, {
  tableName: 'meal',
  timestamps: false,
});

module.exports = Meal;
