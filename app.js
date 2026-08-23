const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session')
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

// Session, runs on every single request
app.use(session({
  secret: process.env.SESSION_SECRET, // signs the session cookie so it can't be tampered with
  resave: false, // don't rewrite the session to the store if nothing changed
  saveUninitialized: false, // don't create/store a session until something is actually saved to it
  cookie: {
    httpOnly: true, // blocks JS from reading the cookie (protects against XSS stealing it)
    secure: false, // only send cookie over HTTPS — set to true once deployed on Render
    sameSite: 'lax' // blocks the cookie from being sent on cross-site requests (protects against CSRF)
  }
}))



// Display page
app.use(express.static('public'))

// Task Routes
const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);



// Auth Routes

// Add before auth
const meRouter = require('./routes/meRoutes')
app.use('/api/auth/me', meRouter)


const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);



// npm run dev
app.listen(process.env.PORT, () => console.log('app is running'));