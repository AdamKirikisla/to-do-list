# To-Do List App

Try it out free: https://to-do-list-o4u6.onrender.com

A full-stack task management application built with Node.js, Express, MySQL, and vanilla JavaScript. This project focuses on backend authentication, session management, database-driven CRUD functionality, and deployment-ready architecture in a real-world web app setup.

## Overview

This project was built to strengthen practical web development skills by creating a complete application flow from user signup to secure task handling. It includes account creation, login, session persistence, protected routes, and a clean task dashboard for managing daily activities.

## Key Features

- User registration and login
- Secure password hashing with bcrypt
- Session-based authentication
- Protected API routes for authenticated users only
- Full CRUD operations for tasks
- Task management with title, category, and priority
- MySQL database integration
- Responsive front-end for a smooth user experience
- Deployment-ready setup for Render

## Tech Stack

- Node.js
- Express.js
- MySQL
- Express Session
- bcryptjs
- validator
- Vanilla JavaScript
- Render

## Project Structure

```bash
.
├── app.js
├── db.js
├── package.json
├── public/
│   ├── index.html
│   ├── log-in.html
│   ├── sign-up.html
│   ├── task.html
│   └── js/
├── controllers/
├── middleware/
├── routes/
├── sql/
│   └── schema.sql
├── README.md
└── .env
```

## What I Built

This application demonstrates:

- backend API development with Express
- database design and table relationships
- user authentication and authorization practices
- secure handling of user credentials
- session management for logged-in state
- frontend integration with API endpoints
- deployment configuration for cloud hosting

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=5000
SESSION_SECRET=your_session_secret_here
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=todo_app
NODE_ENV=development
```

### 3. Set up the database

Create the database and run the schema in `sql/schema.sql`.

```sql
CREATE DATABASE IF NOT EXISTS todo_app;
USE todo_app;
```

### 4. Start the app

```bash
npm run dev
```

## Database Schema

The app uses two main tables:

- `Users`
  - `user_id`
  - `username`
  - `email`
  - `password_hash`
  - `created_at`

- `tasks`
  - `id`
  - `user_id`
  - `title`
  - `category`
  - `priority`
  - `is_done`

## Render Deployment

This project is designed for deployment on Render as a Node.js web service.

### Required environment variables

```env
SESSION_SECRET=your_secure_session_secret
DB_HOST=your_database_host
DB_PORT=3306
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
NODE_ENV=production
```

### Start command

```bash
npm start
```

## Security Notes

The application includes common security practices such as:

- password hashing with bcrypt
- validation for user input
- protected routes requiring authentication
- secure session configuration in production
