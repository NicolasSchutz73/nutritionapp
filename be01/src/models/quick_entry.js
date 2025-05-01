const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Meal = require('./meal');

const QuickEntry = sequelize.define('QuickEntry', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  meal_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Meal, key: 'id' } },
  calories: { type: DataTypes.FLOAT },
  protein: { type: DataTypes.FLOAT },
  carbs: { type: DataTypes.FLOAT },
  fat: { type: DataTypes.FLOAT },
  comment: { type: DataTypes.STRING },
}, {
  tableName: 'quick_entry',
  timestamps: false,
});

Meal.hasMany(QuickEntry, { foreignKey: 'meal_id' });
QuickEntry.belongsTo(Meal, { foreignKey: 'meal_id' });

module.exports = QuickEntry;
