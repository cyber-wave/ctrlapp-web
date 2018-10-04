var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var secure = require('express-force-https');
var session = require('express-session');

var mosca = require('mosca'); //somos amantes de insetos

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(secure); -> ONLY IN PRODUCTION
app.use(session({
  secret: 'super secret', // CHANGE IN PRODUCTION
  resave: false,
  saveUninitialized: true,
  cookie:{ secure:false } //TODO: SET TRUE IN PRODUCTION
  }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//ROUTES
app.use('/', loginRouter);
app.use('/users', usersRouter);



///MOSCA
var moscaSettings = {
  port: 1883 //mqtt port
}
var moscaServer = mosca.Server(moscaSettings);
moscaServer.on('ready',()=>{
  console.log("[MQTT] Mosca está voando alto na porta 1883!");
});

moscaServer.on('clientConnected', function(client) {
  console.log('Client Connected:', client.id);
});

moscaServer.on('clientDisconnected', function(client) {
  console.log('Client Disconnected:', client.id);
});


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
  res.render('error');
});

module.exports = app;
