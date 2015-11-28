var restify     =   require('restify');
var mongojs     =   require('mongojs');
var morgan    	=   require('morgan');
var settings    =   require('./settings');
var url         =   settings.host + "/" + settings.db;
var db          =   mongojs(url, ['userList','postList','replyList','messageList','orgList','broadcastList']);
var server      =   restify.createServer({
  name: "fcws_server"
});


db.on('error', function (err) {
    console.log('database error', err);
});

db.on('ready', function () {
    console.log('database connected');
});

// server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());
// server.use(morgan('dev')); // LOGGER


// // CORS
// server.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });
// 


server.get(/\/docs\/?.*/, restify.serveStatic({
  directory: './assets/v1',
  default: 'index.html'
}));

server.get(/\/apks\/?.*/, restify.serveStatic({
  directory: './assets/v1',
  default: 'index.html'
}));

// server.get(/\/orgnizations\/?.*/, restify.serveStatic({
//   directory: './assets/v1',
//   default: 'index.html'
// }));

server.listen(process.env.PORT || settings.port, settings.host, function () {
    console.log('%s listening at %s',server.name,server.url);
});

var manageUsers = 	require('./api/v1/user')(server, db);
var manageLists =   require('./api/v1/post')(server, db);
var manageReplies =   require('./api/v1/reply')(server, db);
var manageMessages =   require('./api/v1/message')(server, db);
var manageOrgnizations = require('./api/v1/orgnization')(server,db);
