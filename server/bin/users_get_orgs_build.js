//Disposable script
//For writing orgnization infomation to mongodb

var mongojs     =   require('mongojs');
var eventproxy  =   require('eventproxy');
var settings    =   require('../settings');
var url         =   settings.host + "/" + settings.db;
var db          =   mongojs(url, ['userList','orgList']);

db.on('error', function (err) {
    console.log('database error', err);
});

db.on('ready', function () {
    console.log('database connected');
});

var ep  = new eventproxy();


db.userList.find({},function (err,list) {

  ep.after('insert',list.length, function (results) {
      console.log(results);
      db.close();
    });

    list.forEach(function (user) {
      db.orgList.findOne({id:user.belong},function (err,org) {

          db.userList.findAndModify({
              query: { id:user.id },
              update: { $set: { orgs:org.orgs} },
              new: true
          }, function (err, doc) {
              console.log(doc);
              ep.emit('insert',doc);
          });
      });
    });
});
