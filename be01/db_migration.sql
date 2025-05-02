-- MIGRATION POUR NOUVELLE STRUCTURE "REPAS VIRTUELS"

-- 1. Supprimer la table meal (si elle existe)
DROP TABLE IF EXISTS meal;

-- 2. Adapter la table meal_food
ALTER TABLE meal_food
  DROP FOREIGN KEY meal_food_ibfk_1,
  DROP COLUMN meal_id,
  ADD COLUMN date DATE NOT NULL AFTER id,
  ADD COLUMN type ENUM('breakfast', 'lunch', 'dinner', 'snack', 'other') NOT NULL AFTER date;

-- 3. Adapter la table quick_entry
ALTER TABLE quick_entry
  DROP FOREIGN KEY quick_entry_ibfk_1,
  DROP COLUMN meal_id,
  ADD COLUMN date DATE NOT NULL AFTER id,
  ADD COLUMN type ENUM('breakfast', 'lunch', 'dinner', 'snack', 'other') NOT NULL AFTER date;

-- 4. Vérifie que les autres tables ne dépendent plus de meal_id
-- 5. Optionnel : nettoyer les anciennes données orphelines

-- 6. (Re)crée les index utiles
CREATE INDEX idx_meal_food_date_type ON meal_food(date, type);
CREATE INDEX idx_quick_entry_date_type ON quick_entry(date, type);

-- 7. Vérifie la cohérence des données
