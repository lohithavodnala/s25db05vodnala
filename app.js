var logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
require('dotenv').config();

// Import routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ornithologyRouter = require('./routes/ornithology');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');

// Import the Ornithology model
var Ornithology = require("./models/ornithology");

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

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// MongoDB connection
const connectionString = process.env.MONGO_CON;
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
// Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function () {
  console.log("Connection to DB succeeded");
});

// We can seed the collection if needed on server start
async function recreateDB() {
  try {
    // Delete everything
    await Ornithology.deleteMany();

    let instance1 = new Ornithology({
      ornithology_type: "ghost", size: 'large', cost: 15.4
    });
    await instance1.save();
    console.log("First object saved");

    let instance2 = new Ornithology({
      ornithology_type: "bird", size: 'small', cost: 80
    });
    await instance2.save();
    console.log("Second object saved");

    let instance3 = new Ornithology({
      ornithology_type: "ghost", size: 'medium', cost: 20
    });
    await instance3.save();
    console.log("Third object saved");
  } catch (err) {
    console.error("Error while seeding the database:", err);
  }
}

let reseed = true;
if (reseed) { 
  recreateDB(); 
}

module.exports = app;





