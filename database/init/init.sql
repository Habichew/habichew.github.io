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

-- Mood types for mood logs to enumerate
CREATE TABLE IF NOT EXISTS moodTypes(
    id INT PRIMARY KEY AUTO_INCREMENT,
    label VARCHAR(50) NOT NULL UNIQUE,
    -- Optional hex code colours for display in frontend
    colorCode VARCHAR(7)
);

-- Insert into sample mood types table
INSERT INTO moodTypes (label, colorCode) VALUES
('Focused', '#1CC282'),
('Overwhelmed', '#ECECEC'),
('Unmotivated','#DAB7FF'),
('Distracted','#FF952C');

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

-- Insert sample habit_categories data
INSERT INTO habitCategories (name)
VALUES  ('Health'),
        ('Quit'),
        ('Hobbies'),
        ('Lifestyle'),
        ('Career'),
        ('Study'),
        ('Financial'),
        ('Custom');

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
    startDate DATETIME,
    goalDate DATETIME,
    frequency VARCHAR(20),        -- e.g., 'Daily', 'Weekly'
    isArchived BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `completedAt` DATE,

    -- The habitId represents a preset habit, the customTitle represents a custom habit, so they cannot be NULL at the same time.
    CONSTRAINT chk_customTitle_if_no_habitId
        CHECK (
            habitId IS NOT NULL OR (habitId IS NULL AND customTitle IS NOT NULL)
            ),
    CONSTRAINT fkUserHabit FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    -- CONSTRAINT fkHabit FOREIGN KEY (habitId) REFERENCES habits(id)
);


CREATE TABLE IF NOT EXISTS `tasks` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `habitId` integer,
  `description` varchar(255)
);

CREATE TABLE IF NOT EXISTS `userTasks` (
   `id` integer PRIMARY KEY AUTO_INCREMENT,
   `customTitle` varchar(255),
   `taskId` integer,
   `userHabitId` integer NOT NULL ,
   `completed` boolean DEFAULT false,
   `description` varchar(255),
   `credit` INT,
   `priority` TEXT, -- low, medium, high
   `dueAt` DATETIME,
   `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `completedAt` DATE,

   CONSTRAINT chk_customTitle_if_no_taskId
       CHECK (
           taskId IS NOT NULL OR (taskId IS NULL AND customTitle IS NOT NULL)
           ),
   CONSTRAINT fkHabitTask FOREIGN KEY (userHabitId) REFERENCES userHabits(id) ON DELETE CASCADE
);

ALTER TABLE `users` ADD FOREIGN KEY (`petId`) REFERENCES `pets` (`id`);

ALTER TABLE `tasks` ADD FOREIGN KEY (`habitId`) REFERENCES `habits` (`id`);

-- Add your existing database schema here