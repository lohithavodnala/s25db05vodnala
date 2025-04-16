var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');  // Moved the mongoose import to the top
require('dotenv').config();


const connectionString = process.env.MONGO_CON;  // Ensure the environment variable is set

// Check connection string
if (!connectionString) {
  console.error('MONGO_CON environment variable not set!');
  process.exit(1);  // Exit the application if the connection string is not provided
}

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ornithologyRouter = require('./routes/ornithology');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
// Fixed the route file path typo to `resource.js`
var resourceRouter = require("./routes/resource");  // Fixed typo here

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ornithology', ornithologyRouter);
app.use('/grid', gridRouter);
app.use('/pick', pickRouter);
// Added resource route
app.use('/resource', resourceRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Get the default connection
var db = mongoose.connection;
// Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function () {
  console.log("Connection to DB succeeded");
});

// Seed the database if needed
async function recreateDB() {
  // Delete everything
  await Ornithology.deleteMany();  // Fixed typo here to match the model name
  
  let instance1 = new Ornithology({
    ornithology_type: "ghost", size: 'large', cost: 15.4
  });
  await instance1.save().then(doc => {
    console.log("First object saved");
  }).catch(err => {
    console.error(err);
  });

  let instance2 = new Ornithology({
    ornithology_type: "bird", size: 'small', cost: 80
  });
  await instance2.save().then(doc => {
    console.log("Second object saved");
  }).catch(err => {
    console.error(err);
  });

  let instance3 = new Ornithology({
    ornithology_type: "ghost", size: 'medium', cost: 20
  });
  await instance3.save().then(doc => {
    console.log("Third object saved");
  }).catch(err => {
    console.error(err);
  });
}

let reseed = true;
if (reseed) { recreateDB(); }

module.exports = app;
