const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const NutritionGoal = sequelize.define('NutritionGoal', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  calories_goal: { type: DataTypes.FLOAT },
  protein_goal: { type: DataTypes.FLOAT },
  carbs_goal: { type: DataTypes.FLOAT },
  fat_goal: { type: DataTypes.FLOAT },
}, {
  tableName: 'nutrition_goal',
  timestamps: false,
});

module.exports = NutritionGoal;
