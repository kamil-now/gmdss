const path = require('path')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const morgan = require('morgan')
const passport = require('passport')
const connectDB = require('./config/database').connectDB

const user = require('./routes/user')
const auth = require('./routes/auth')

// Load config
dotenv.config({ path: __dirname + `/config/config.${process.env.NODE_ENV}.env` })


// Passport config
require('./config/passport')(passport)

// Database
connectDB()

const app = express()

// Logging
app.use(morgan(process.env.NODE_ENV))


// Passport middleware
app.use(passport.initialize())

require('./config/passport')(passport);

// CORS middleware
app.use(cors())

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/auth', auth)
app.use('/user', user)

// Set static folder
app.use(express.static(path.join(__dirname, './public')));

// Index route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint')
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

module.exports = app;  
