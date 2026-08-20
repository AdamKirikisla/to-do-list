CREATE DATABASE IF NOT EXISTS todo_app;
USE todo_app;
DROP TABLE IF EXISTS tasks;
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category ENUM('work', 'personal', 'errands') NOT NULL DEFAULT 'work',
    priority ENUM('low', 'medium', 'high') NOT NULL DEFAULT 'medium',
    is_done BOOLEAN NOT NULL DEFAULT FALSE
);