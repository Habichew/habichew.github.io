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
  `profileImg` varchar(2083) DEFAULT 'https://i.ibb.co/q3MfyBnr/habichew.png',
  `credits` integer,
  `tasks_num` integer,
  `petId` integer,
  `userHabitsId` integer,
  `tasksNum` integer,
    -- Record created and updated time automatically
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample users data
INSERT INTO users (username, email, password, petId)
VALUES
    ('john_doe',
     'john@example.com',
     '$2b$10$oLLIBsQbaByUKb8/U138uuItjNLWcf6jZFT8fXTTiEJxTKT.wRGD6', -- password = 'john'
     1),
    ('jane_smith',
     'jane@example.com',
     '$2b$10$i.lhKkpYxtxq5XmLt4Wpd.n9fuv7xmfVS6IGAr2UjPPfef411i6VC', -- password = 'jane'
     2);

CREATE TABLE IF NOT EXISTS userHabits (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `userId` integer,
  `habitId` integer
);

-- Mood types for mood logs to enumerate
CREATE TABLE IF NOT EXISTS moodTypes(
    id INT PRIMARY KEY AUTO_INCREMENT,
    label VARCHAR(50) NOT NULL UNIQUE,
    -- Optional hex code colours for display in frontend
    colorCode VARCHAR(7)
);

-- Insert into sample mood types table
INSERT INTO moodTypes (label, colorCode) VALUES
('Focused', '#B363E8'),
('Overwhelmed', '#FFAF59'),
('Unmotivated','#FFED95'),
('Distracted','#FF5950');

-- Mood logs for users
DROP TABLE moodLogs;
CREATE TABLE IF NOT EXISTS moodLogs (
    id integer PRIMARY KEY AUTO_INCREMENT,
    userId integer NOT NULL,
    moodTypeId integer NOT NULL,
    -- Optional notes for the mood log
    note TEXT,
    -- The date of the mood log
    moodDate DATE NOT NULL,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,


    CONSTRAINT fkUserMood FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fkMoodType FOREIGN KEY (moodTypeId) REFERENCES moodTypes(id),
    -- The user can have one and only one mood log everyday
    UNIQUE(userId, moodDate)
);

INSERT INTO moodLogs (userId, moodTypeId, note, moodDate)
VALUES
    (1, 3, 'Felt a bit low today.', '2025-07-12'),
    (1,2,'','2025-07-13');


CREATE TABLE IF NOT EXISTS pets (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `mood` varchar(255),
  `personality` varchar(255),
  `level` integer,
  `hunger` integer,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample pets data
INSERT INTO pets (name, mood, personality, level) VALUES
('henry', 'happy', 'calm', 1),
('filou', 'hungry', 'anxious', 1);

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
INSERT INTO tasks (description, score, level, priority, recommendation, categoryId, dueAt) VALUES ('eat healthily', '50', '3', 2, '', 1, '2026-01-01'), ('study for exam', '30', '3', 1, '', 1, '2025-07-10');

CREATE TABLE IF NOT EXISTS `habitCategories` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL
);

-- Insert sample habit_categories data
INSERT INTO habitCategories (name) VALUES
('Health'),
('Studies'),
('Hobbies'),
('Mindfulness');

ALTER TABLE `users` ADD FOREIGN KEY (`petId`) REFERENCES `pets` (`id`);

ALTER TABLE `users` ADD FOREIGN KEY (`userHabitsId`) REFERENCES `userHabits` (`id`);

ALTER TABLE `userHabits` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

ALTER TABLE `userHabits` ADD FOREIGN KEY (`habitId`) REFERENCES `habits` (`id`);

ALTER TABLE `habits` ADD FOREIGN KEY (`taskId`) REFERENCES `tasks` (`id`);

ALTER TABLE `tasks` ADD FOREIGN KEY (`categoryId`) REFERENCES `habitCategories` (`id`);

-- Add your existing database schema here