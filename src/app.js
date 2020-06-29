const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();
require('./utils/sms');
require('./utils/sms2');

const app = express();

app.get('/', (req, res) => {
  res.render('home');
});

// Setting Up View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Database
require("./db/postgres");

// My routes
const userRoutes = require('./routes/user');
const blogRoutes = require('./routes/blog');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// My routes -> Middlewares
app.use(userRoutes);
app.use(blogRoutes);

// Starting a server 
const PORT = process.env.PORT || 2021;
app.listen(PORT, console.log(`Up And Running on PORT ${PORT}`));