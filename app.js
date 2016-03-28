var express = require('express'),
    domain = require('domain'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    i18n = require("i18next"),
    bodyParser = require('body-parser');

var routes = require('./routes/index');
var userAPI = require('./routes/api/0.1/userAPI');
var fruitAPI = require('./routes/api/0.1/fruitAPI');

var dom = domain.create(),
    app = express();

//i18n init
i18n.init({ lng: 'en-US' }, function(err, t) {
    if(err)
        console.log(err);
});
i18n.setLng('en-US', function(err, t) {
    if(err)
        console.log(err);
});
app.use(i18n.handle);
i18n.registerAppHelper(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api/0.1/user', userAPI);
app.use('/api/0.1/fruit', fruitAPI);

// error handlers
app.use(function(error, req, res, next){
    if(domain.active){
        console.info('caught with domain ', domain.active);
        domain.active.emit('error', error);
    }else{
        //DEFAULT ERROR HANDLERS
        // catch 404 and forward to error handler
        app.use(function(req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });

        // development error handler
        // will print stacktrace
        if (app.get('env') === 'development') {
          app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
          });
        }

        // production error handler
        // no stacktraces leaked to user
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: {}
            });
        });
    }
});


module.exports = app;
