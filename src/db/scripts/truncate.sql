-- Désactiver temporairement les contraintes de clé étrangère
SET session_replication_role = 'replica';

-- Troncature des tables dans l'ordre approprié
TRUNCATE TABLE users_to_groups;
TRUNCATE TABLE profile_info;
TRUNCATE TABLE accounts;
TRUNCATE TABLE products;
TRUNCATE TABLE categories;
TRUNCATE TABLE todos;
TRUNCATE TABLE users;
TRUNCATE TABLE groups;

-- Réactiver les contraintes de clé étrangère
SET session_replication_role = 'origin';