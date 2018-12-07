var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var secure = require('express-force-https');
var session = require('express-session');
var cron = require('node-cron');
var PresencaDAO = require('./models/presencaProfessor/presencaProfessorDAO');

var homeRouter = require('./routes/home');
var controleRouter = require('./routes/controle');
var topicosRouter = require('./routes/topicos');
var requisicoesRouter = require('./routes/requisicoes');
var laboratoriosRouter = require('./routes/laboratorios');
var noticiasRouter = require('./routes/noticias');
var loginRouter = require('./routes/login');
var alunosRouter = require('./routes/alunos');
var professoresRouter = require('./routes/professores');
var secretariosRouter = require('./routes/secretarios');
var apiRouter = require('./routes/api/main');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(secure); -> ONLY IN PRODUCTION
app.use(session({
  secret: 'super secret', // CHANGE IN PRODUCTION
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } //TODO: SET TRUE IN PRODUCTION
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api', apiRouter); //mobile

/*
app.use(function (req, res, next) {

  if (req.session.secretario) {
    console.log("Tem usuário");
    next();
  } else {
    console.log("Não tem usuário");
    res.render('login', {
      title: "Login do secretário"
    });
  }
});
*/

//ROUTES
app.use('/', homeRouter);
app.use('/controle', controleRouter);
app.use('/noticias', noticiasRouter);
app.use('/login', loginRouter);
app.use('/laboratorios', laboratoriosRouter);
app.use('/requisicoes', requisicoesRouter);
app.use('/topicos', topicosRouter);
app.use('/alunos', alunosRouter);
app.use('/professores', professoresRouter);
app.use('/secretarios', secretariosRouter);


cron.schedule('0 0 * * *', () =>{
  console.log("Iniciando CRON job...");
  
    PresencaDAO.deleteMany({}).exec()
    .then(() => {
      console.log("Presenca limpa.");
      
    })
    .catch(err =>{
      console.error("CRON job failure");
      console.error(err);
      
    })
}, {
  timezone: "America/Sao_Paulo"
})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
