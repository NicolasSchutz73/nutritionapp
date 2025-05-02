const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const QuickEntry = sequelize.define('QuickEntry', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  type: { type: DataTypes.ENUM('breakfast', 'lunch', 'dinner', 'snack', 'other'), allowNull: false },
  calories: { type: DataTypes.FLOAT },
  protein: { type: DataTypes.FLOAT },
  carbs: { type: DataTypes.FLOAT },
  fat: { type: DataTypes.FLOAT },
  comment: { type: DataTypes.STRING },
}, {
  tableName: 'quick_entry',
  timestamps: false,
});

module.exports = QuickEntry;
