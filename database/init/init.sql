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
  `credits` integer,
  `tasks_num` integer,
  `petId` integer,
  `tasksNum` integer,
  `taskLastCompleted` timestamp DEFAULT CURRENT_TIMESTAMP,
    -- Record created and updated time automatically
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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

CREATE TABLE IF NOT EXISTS `habitCategories` (
 `id` integer PRIMARY KEY AUTO_INCREMENT,
 `name` varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `habits` (
    id integer PRIMARY KEY AUTO_INCREMENT,
    title varchar(255),
    categoryId integer,
    CONSTRAINT fkHabitCategory FOREIGN KEY (categoryId) REFERENCES habitCategories(id)
);
CREATE TABLE userHabits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    habitId INT,
    customTitle VARCHAR(255),
    priority INT,
    startDate DATE,
    goalDate DATE,
    frequency VARCHAR(20),        -- e.g., 'Daily', 'Weekly'
    isArchived BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_customTitle_if_no_habitId
        CHECK (
            habitId IS NOT NULL OR (habitId IS NULL AND customTitle IS NOT NULL)
            ),
    CONSTRAINT fkUserHabit FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    -- CONSTRAINT fkHabit FOREIGN KEY (habitId) REFERENCES habits(id)
);

INSERT INTO userHabits (userId, habitId, customTitle, priority, startDate, goalDate, frequency)
VALUES
    (1,2,NULL,1, '2025-07-15','2025-08-15','Daily'),
    (1, NULL, 'Read philosophy', 2, '2025-07-16', '2025-09-16', 'Weekly'),
    (1, 5, 'Evening Yoga', 1, '2025-07-20', '2025-08-20', 'Daily'),
    (2, NULL, 'Digital Detox', 3, '2025-07-10', '2025-10-10', 'Weekly');

-- Insert sample habit_categories data
INSERT INTO habitCategories (name) VALUES
   ('Health'),
   ('Quit'),
   ('Hobbies'),
   ('Lifestyle'),
   ('Career'),
   ('Study'),
   ('Financial'),
   ('Custom');

-- Insert sample habits data
INSERT INTO habits (title, categoryId) VALUES
-- Health (1)
('Eat Healthy', 1),
('Drink Enough Water', 1),
('Eat Fruits', 1),
('Exercise', 1),
('Walk', 1),
('Run', 1),
('Stretch', 1),
('Meditation', 1),
('Yoga', 1),
('Cycling', 1),
('Swim', 1),

-- Quit (2)
('Smoking', 2),
('Vaping', 2),
('Coffee', 2),
('Drinking', 2),
('Junk Food', 2),
('Sugar', 2),
('Porn', 2),
('Social Media', 2),
('Carbonated Drinks', 2),
('Weed', 2),
('Drugs', 2),
('Swearing', 2),

-- Hobbies (3)
('Reading', 3),
('Drawing', 3),
('Play Music', 3),
('Photography', 3),
('Writing', 3),
('DIY Crafts', 3),

-- Lifestyle (4)
('Bedtime Routine', 4),
('Sleep Early', 4),
('Sleep 8 Hrs', 4),
('Wake Up Early', 4),
('Make My Bed', 4),
('Take a Shower', 4),
('Eat Breakfast', 4),

-- Career (5)
('Learn a Language', 5),
('Be Consistent', 5),
('Set Goals', 5),
('Be Productive', 5),
('New Project', 5),

-- Study (6)
('Study', 6),
('Review Notes', 6),
('Pomodoro Sessions', 6),

-- Financial (7)
('Track Expenses', 7),
('Budgeting', 7),
('Save Money', 7),
('No-Spend Day', 7),
('Invest Weekly', 7),

-- Custom (8)
('Custom Habit 1', 8),
('Custom Habit 2', 8);

CREATE TABLE IF NOT EXISTS `tasks` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `habitId` integer,
  `completed` boolean DEFAULT false,
  `description` varchar(255)
);

-- Insert sample tasks data
INSERT INTO tasks (title, completed, description, habitId)
VALUES ('find t1d cooking blogs',
        false,
        'improve my hba1c through better diet',
        1),
       ('study for exam',
        true,
        'prepare for my biology exam',
        1);

CREATE TABLE IF NOT EXISTS `userTasks` (
   `id` integer PRIMARY KEY AUTO_INCREMENT,
   `title` varchar(255) NOT NULL,
   `habitId` integer,
   `completed` boolean DEFAULT false,
   `description` varchar(255),
   `score` integer,
   `priority` integer,
   `dueAt` datetime,
   `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample userTasks data
INSERT INTO userTasks (title, completed, description, score, priority, habitId, dueAt)
VALUES ('find t1d cooking blogs',
        false,
        'improve my hba1c through better diet',
        50,
        2,
        1,
        '2026-01-01'),
       ('study for exam',
        true,
        'prepare for my biology exam',
        30,
        3,
        1,
        '2025-07-10');

ALTER TABLE `users` ADD FOREIGN KEY (`petId`) REFERENCES `pets` (`id`);

ALTER TABLE `tasks` ADD FOREIGN KEY (`habitId`) REFERENCES `habits` (`id`);

-- Add your existing database schema here