-- Create database
-- Drop the database and recreate before running, if there's too many changes to make.
DROP DATABASE IF EXISTS habichew_db;
CREATE DATABASE IF NOT EXISTS habichew_db;
USE habichew_db;

-- Create any other tables your app needs

CREATE TABLE IF NOT EXISTS users (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255),
  `username` varchar(255),
  `password` varchar(255),
    -- 2083 is the most recommended length for URL
  `profileImg` varchar(2083) DEFAULT 'https://i.ibb.co/q3MfyBnr/habichew.png',
  `mood` varchar(255),
  `petId` integer,
  `score` integer,
  `fuelStatus` double,
  `currentPlanetId` integer,
  `visitedPlanets` integer,
  `finishedPlanets` integer,
  `userHabitsId` integer,
  `tasksNum` integer,
    -- Record created and updated time automatically
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample users data
INSERT INTO users (username, email, password) VALUES
('john_doe', 'john@example.com', 'hashed_password_123'),
('jane_smith', 'jane@example.com', 'hashed_password_456');

CREATE TABLE IF NOT EXISTS user_habits (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `userId` integer,
  `habitId` integer
);

CREATE TABLE IF NOT EXISTS pets (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `mood` varchar(255),
  `personality` varchar(255),
  `level` integer,
  `hunger` integer,
  `createdAt` timestamp
);

CREATE TABLE IF NOT EXISTS `planets` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `encounterId` integer,
  `postcardId` integer,
  `gameId` integer
);

CREATE TABLE IF NOT EXISTS `habits` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `taskId` integer
);

CREATE TABLE IF NOT EXISTS `tasks` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `description` varchar(255),
  `score` integer,
  `level` integer,
  `priority` integer,
  `recommendation` varchar(255),
  `categoryId` integer,
  `habitId` integer,
  `dueAt` datetime,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

-- Insert sample tasks data
INSERT INTO tasks (description, score, level, priority, recommendation, category_id, due_at) VALUES ('eat healthily', '50', '3', 2, '', 1, '2026-01-01'), ('study for exam', '30', '3', 1, '', 1, '2025-07-10');

CREATE TABLE IF NOT EXISTS `habitCategories` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255)
);

-- Insert sample habit_categories data
INSERT INTO habitCategories (name) VALUES
('Health'),
('Studies'),
('Hobbies'),
('Mindfulness');

ALTER TABLE `users` ADD FOREIGN KEY (`petId`) REFERENCES `pets` (`id`);

ALTER TABLE `users` ADD FOREIGN KEY (`currentPlanetId`) REFERENCES `planets` (`id`);

ALTER TABLE `users` ADD FOREIGN KEY (`userHabitsId`) REFERENCES `user_habits` (`id`);

ALTER TABLE `userHabits` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

ALTER TABLE `userHabits` ADD FOREIGN KEY (`habitId`) REFERENCES `habits` (`id`);

ALTER TABLE `habits` ADD FOREIGN KEY (`taskId`) REFERENCES `tasks` (`id`);

ALTER TABLE `tasks` ADD FOREIGN KEY (`categoryId`) REFERENCES `habit_categories` (`id`);

-- Add your existing database schema here