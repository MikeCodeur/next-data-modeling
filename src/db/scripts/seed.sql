INSERT INTO Todo (title, isCompleted, createdAt, updatedAt) VALUES
('Learn TypeScript', false, '2024-01-01 10:00:00', '2024-01-01 10:00:00'),
('Build a Next.js App', false, '2024-01-02 11:00:00', '2024-01-02 11:00:00'),
('Write a Blog Post', true, '2024-01-03 09:00:00', '2024-01-03 09:00:00'),
('Create a YouTube Video', false, '2024-01-04 14:00:00', '2024-01-04 14:00:00'),
('Read a Technical Book', true, '2024-01-05 08:00:00', '2024-01-05 08:00:00'),
('Update Portfolio', false, '2024-01-06 15:00:00', '2024-01-06 15:00:00'),
('Attend a Webinar', true, '2024-01-07 12:00:00', '2024-01-07 12:00:00'),
('Practice Coding Challenges', false, '2024-01-08 17:00:00', '2024-01-08 17:00:00'),
('Network with Peers', false, '2024-01-09 13:00:00', '2024-01-09 13:00:00'),
('Plan Next Month’s Goals', true, '2024-01-10 18:00:00', '2024-01-10 18:00:00');


INSERT INTO Category (name) VALUES
('Electronics'),
('Books'),
('Clothing'),
('Home Appliances'),
('Sports Equipment');

INSERT INTO Product (id, title, price, description, image, category_id, quantity, createdat, updatedat) VALUES
(1, 'Product 1', 19.99, 'Description for Product 1', 'image1.png', 1, 10, '2024-01-01 10:00:00', '2024-01-01 10:00:00'),
(2, 'Product 2', 29.99, 'Description for Product 2', 'image2.png', 1, 20, '2024-01-02 11:00:00', '2024-01-02 11:00:00'),
(3, 'Product 3', 39.99, 'Description for Product 3', 'image3.png', 2, 30, '2024-01-03 12:00:00', '2024-01-03 12:00:00'),
(4, 'Product 4', 49.99, 'Description for Product 4', 'image4.png', 2, 40, '2024-01-04 13:00:00', '2024-01-04 13:00:00'),
(5, 'Product 5', 59.99, 'Description for Product 5', 'image5.png', 3, 50, '2024-01-05 14:00:00', '2024-01-05 14:00:00'),
(6, 'Product 6', 69.99, 'Description for Product 6', 'image6.png', 3, 60, '2024-01-06 15:00:00', '2024-01-06 15:00:00'),
(7, 'Product 7', 79.99, 'Description for Product 7', 'image7.png', 4, 70, '2024-01-07 16:00:00', '2024-01-07 16:00:00'),
(8, 'Product 8', 89.99, 'Description for Product 8', 'image8.png', 4, 80, '2024-01-08 17:00:00', '2024-01-08 17:00:00'),
(9, 'Product 9', 99.99, 'Description for Product 9', 'image9.png', 5, 90, '2024-01-09 18:00:00', '2024-01-09 18:00:00'),
(10, 'Product 10', 109.99, 'Description for Product 10', 'image10.png', 5, 100, '2024-01-10 19:00:00', '2024-01-10 19:00:00');

-- Insérer des utilisateurs
INSERT INTO users (name) VALUES
('Alice'),
('Bob');

-- Récupérer les IDs des utilisateurs nouvellement créés
WITH user_ids AS (
  SELECT id FROM users WHERE name IN ('Alice', 'Bob')
)

-- Insérer des informations de profil pour chaque utilisateur
INSERT INTO profile_info (user_id, metadata) VALUES
((SELECT id FROM users WHERE name = 'Alice'), '{"age": 25, "city": "New York"}'),
((SELECT id FROM users WHERE name = 'Bob'), '{"age": 30, "city": "San Francisco"}');

INSERT INTO groups (name) VALUES
('Admin'),
('User');

-- Établir les relations entre les utilisateurs et les groupes
INSERT INTO users_to_groups (user_id, group_id) VALUES
((SELECT id FROM users WHERE name = 'Alice'), (SELECT id FROM groups WHERE name = 'Admin')),
((SELECT id FROM users WHERE name = 'Alice'), (SELECT id FROM groups WHERE name = 'User')),
((SELECT id FROM users WHERE name = 'Bob'), (SELECT id FROM groups WHERE name = 'User'));