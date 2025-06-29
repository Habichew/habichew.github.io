-- Create database
CREATE DATABASE IF NOT EXISTS habichew_db;
USE habichew_db;

-- Create any other tables your app needs
CREATE TABLE IF NOT EXISTS `users` (
  `id` integer PRIMARY KEY,
  `email` varchar(255),
  `username` varchar(255),
  `password` varchar(255),
  `mood` varchar(255),
  `pet_id` integer,
  `score` integer,
  `fuel_status` double,
  `current_planet_id` integer,
  `visited_planets` integer,
  `finished_planets` integer,
  `user_habits_id` integer,
  `tasks_num` integer,
  `created_at` timestamp
);

-- Insert sample data
INSERT INTO users (username, email, password_hash) VALUES
('john_doe', 'john@example.com', 'hashed_password_123'),
('jane_smith', 'jane@example.com', 'hashed_password_456');

CREATE TABLE IF NOT EXISTS `userHabits` (
  `id` integer PRIMARY KEY,
  `user_id` integer,
  `habit_id` integer
);

CREATE TABLE IF NOT EXISTS `pets` (
  `id` integer PRIMARY KEY,
  `name` varchar(255),
  `mood` varchar(255),
  `personality` varchar(255),
  `level` integer,
  `hunger` integer,
  `created_at` timestamp
);

CREATE TABLE IF NOT EXISTS `planets` (
  `id` integer PRIMARY KEY,
  `name` varchar(255),
  `encounter_id` integer,
  `postcard_id` integer,
  `game_id` integer
);

CREATE TABLE IF NOT EXISTS `habits` (
  `id` integer PRIMARY KEY,
  `name` varchar(255),
  `task_id` integer
);

CREATE TABLE IF NOT EXISTS `tasks` (
  `id` integer PRIMARY KEY,
  `description` varchar(255),
  `score` integer,
  `level` integer,
  `priority` integer,
  `recommendation` varchar(255),
  `due_at` datetime,
  `created_at` timestamp
);

ALTER TABLE `users` ADD FOREIGN KEY (`pet_id`) REFERENCES `pets` (`id`);

ALTER TABLE `users` ADD FOREIGN KEY (`current_planet_id`) REFERENCES `planets` (`id`);

ALTER TABLE `users` ADD FOREIGN KEY (`user_habits_id`) REFERENCES `userHabits` (`id`);

ALTER TABLE `userHabits` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `userHabits` ADD FOREIGN KEY (`habit_id`) REFERENCES `habits` (`id`);

ALTER TABLE `habits` ADD FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`);

-- Add your existing database schema here