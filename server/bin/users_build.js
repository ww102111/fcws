//Disposable script
//For writing userList infomation to mongodb
var mongojs     =   require('mongojs');
var settings    =   require('../settings');
var url         =   settings.host + "/" + settings.db;
var db          =   mongojs(url, ['userList','orgList']);

db.on('error', function (err) {
    console.log('database error', err);
});

db.on('ready', function () {
    console.log('database connected');
});

var userList= [
  {id: "00000000", name : "A", title: "营长", isLeader: true,  belong: "1", password: "123",orgs: []},
  {id: "00000001", name : "B", title: "连长", isLeader: true,  belong: "2", password: "123",orgs: []},
  {id: "00000002", name : "C", title: "排长", isLeader: true,  belong: "3", password: "123",orgs: []},
  {id: "00000003", name : "D", title: "班长", isLeader: true,  belong: "4", password: "123",orgs: []},
  {id: "00000004", name : "E", title: "士兵", isLeader: false, belong: "4", password: "123",orgs: []},
  {id: "00000005", name : "F", title: "士兵", isLeader: false, belong: "4", password: "123",orgs: []},
  {id: "00000006", name : "G", title: "士兵", isLeader: false, belong: "4", password: "123",orgs: []},
  {id: "00000007", name : "H", title: "连长", isLeader: true,  belong: "5", password: "123",orgs: []},
  {id: "00000008", name : "I", title: "排长", isLeader: true,  belong: "6", password: "123",orgs: []},
  {id: "00000009", name : "J", title: "班长", isLeader: true,  belong: "7", password: "123",orgs: []},
  {id: "00000010", name : "K", title: "士兵", isLeader: false, belong: "7", password: "123",orgs: []},
  {id: "00000011", name : "L", title: "士兵", isLeader: false, belong: "7", password: "123",orgs: []},
  {id: "00000012", name : "M", title: "士兵", isLeader: false, belong: "7", password: "123",orgs: []},
];

/*
 insert people to orgnizations
*/
  db.userList.remove({}, function () {
      db.userList.insert(userList,function(err,results){
        console.log(results);
        db.close();
      });
});
