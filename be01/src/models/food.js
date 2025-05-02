const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Food = sequelize.define('Food', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  calories: { type: DataTypes.FLOAT },
  protein: { type: DataTypes.FLOAT },
  carbs: { type: DataTypes.FLOAT },
  fat: { type: DataTypes.FLOAT },
}, {
  tableName: 'food',
  timestamps: false,
});

module.exports = Food;
