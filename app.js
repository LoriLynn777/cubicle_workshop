// const dotenv = require('dotenv');

const createError = require('http-errors');
const express = require('express'); // Require library Express
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const hbs = require('hbs');

// Routes

const indexRouter = require('./routes/index');
const createCubeRouter = require('./routes/create');
const attachAccessoryRouter = require('./routes/attach');
const detailsRouter = require('./routes/details');
const aboutRouter = require('./routes/about');
const searchRouter = require('./routes/search');
const editRouter = require('./routes/edit');
const deleteRouter = require('./routes/delete');
const createAccessoryRouter = require('/routes/createAccessory');
const cookieRouter = require('./routes/cookie');
const { constants } = require('buffer');

// Create variable "app" to represent our app and invoke Express()
const app = express(); 

// Hide your Mongo connection variables 
require('dotenv').config()

// Mongo DB Connection 
const dbURI = 'mongodb+srv://dbUser:sT%40rgot433@cluster0.llz1y.mongodb.net/cube_db';
// const dbURI = process.env.DB_URI;
  mongoose.connect(process.env.DB_URI,  {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then( (res) => console.log('db connected'))
    .catch((err) => console.log(err));

// View Engine Setup

app.set('views', path.join(__dirname, 'views')); // set public files fldr
app.set('view engine', 'hbs'); // set view eng to hbs, compiles into HTML
hbs.registerPartials("./views/partials");
hbs.registerHelper('isEqual', function (expectedValue, value) {
  return value === expectedValue;
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Initialize passport, session
app.use(require('express-session')({
  secret: process.env.EXP_SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


// Unprotected Routes
app.use('/', indexRouter);
app.use('/search', searchRouter);
app.use('/details', detailsRouter);
app.use('/about', aboutRouter);

// Protected Routes
app.use(ensureAuthenticated);
app.use('/login', loginRouter);
app.use('/create', createCubeRouter);
app.use('/attach', attachAccessoryRouter);
app.use('/edit', editRouter);
app.use('/delete', deleteRouter);
app.use('/cookie', cookieRouter);

// Passport Config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('404');
});

module.exports = app;
