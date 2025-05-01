const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Food = require('./food');
const Meal = require('./meal');

const MealFood = sequelize.define('MealFood', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  meal_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Meal, key: 'id' } },
  food_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Food, key: 'id' } },
  quantity_g: { type: DataTypes.FLOAT, allowNull: false },
}, {
  tableName: 'meal_food',
  timestamps: false,
});

Meal.hasMany(MealFood, { foreignKey: 'meal_id' });
MealFood.belongsTo(Meal, { foreignKey: 'meal_id' });
Food.hasMany(MealFood, { foreignKey: 'food_id' });
MealFood.belongsTo(Food, { foreignKey: 'food_id' });

module.exports = MealFood;
