CREATE TABLE Todo (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  isCompleted BOOLEAN NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Définir l'énumération CategoriesEnum
CREATE TYPE CategoriesEnum AS ENUM ('default', 'lighting', 'furniture', 'bags');

-- Créer la table Product
CREATE TABLE Product (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  price NUMERIC(10, 2),
  description TEXT,
  image VARCHAR(255),
  category CategoriesEnum,
  quantity INTEGER,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);