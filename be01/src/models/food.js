const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Food = sequelize.define('Food', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  brand: { type: DataTypes.STRING },
  calories_per_100g: { type: DataTypes.FLOAT, allowNull: false },
  protein_per_100g: { type: DataTypes.FLOAT, allowNull: false },
  carbs_per_100g: { type: DataTypes.FLOAT, allowNull: false },
  fat_per_100g: { type: DataTypes.FLOAT, allowNull: false },
}, {
  tableName: 'food',
  timestamps: false,
});

module.exports = Food;
