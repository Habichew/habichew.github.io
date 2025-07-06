-- Create database
-- Drop the database and recreate before running, if there's too many changes to make.
-- DROP DATABASE IF EXISTS habichew_db;
CREATE DATABASE IF NOT EXISTS habichew_db;
USE habichew_db;

-- Create any other tables your app needs

CREATE TABLE IF NOT EXISTS users (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255),
  `username` varchar(255),
  `password` varchar(255),
    -- 2083 is the most recommended length for URL
  `profile_img` varchar(2083) DEFAULT 'https://i.ibb.co/q3MfyBnr/habichew.png',
  `mood` varchar(255),
  `pet_id` integer,
  `score` integer,
  `fuel_status` double,
  `current_planet_id` integer,
  `visited_planets` integer,
  `finished_planets` integer,
  `user_habits_id` integer,
  `tasks_num` integer,
    -- Record created and updated time automatically
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO users (username, email, password) VALUES
('john_doe', 'john@example.com', 'hashed_password_123'),
('jane_smith', 'jane@example.com', 'hashed_password_456');

CREATE TABLE IF NOT EXISTS user_habits (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer,
  `habit_id` integer
);

CREATE TABLE IF NOT EXISTS pets (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `mood` varchar(255),
  `personality` varchar(255),
  `level` integer,
  `hunger` integer,
  `created_at` timestamp
);

CREATE TABLE IF NOT EXISTS `planets` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `encounter_id` integer,
  `postcard_id` integer,
  `game_id` integer
);

CREATE TABLE IF NOT EXISTS `habits` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `task_id` integer
);

CREATE TABLE IF NOT EXISTS `tasks` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `description` varchar(255),
  `score` integer,
  `level` integer,
  `priority` integer,
  `recommendation` varchar(255),
  `category_id` integer,
  `due_at` datetime,
  `created_at` timestamp
);

CREATE TABLE IF NOT EXISTS `habit_categories` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255)
);

ALTER TABLE `users` ADD FOREIGN KEY (`pet_id`) REFERENCES `pets` (`id`);

ALTER TABLE `users` ADD FOREIGN KEY (`current_planet_id`) REFERENCES `planets` (`id`);

ALTER TABLE `users` ADD FOREIGN KEY (`user_habits_id`) REFERENCES `user_habits` (`id`);

ALTER TABLE `user_habits` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `user_habits` ADD FOREIGN KEY (`habit_id`) REFERENCES `habits` (`id`);

ALTER TABLE `habits` ADD FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`);

ALTER TABLE `tasks` ADD FOREIGN KEY (`category_id`) REFERENCES `habit_categories` (`id`);

-- Add your existing database schema here