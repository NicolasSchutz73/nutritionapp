const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Food = require('./food');

const MealFood = sequelize.define('MealFood', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  type: { type: DataTypes.ENUM('breakfast', 'lunch', 'dinner', 'snack', 'other'), allowNull: false },
  food_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Food, key: 'id' } },
  quantity_g: { type: DataTypes.FLOAT, allowNull: false },
}, {
  tableName: 'meal_food',
  timestamps: false,
});

Food.hasMany(MealFood, { foreignKey: 'food_id' });
MealFood.belongsTo(Food, { foreignKey: 'food_id' });

module.exports = MealFood;
