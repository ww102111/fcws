//Disposable script
//For writing orgnization infomation to mongodb
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


var orgsList = [
  {id: "1", name: "2营",   belong: null, leader: "00000000",orgs:["1"]},
  {id: "2", name: "172连", belong: "1",  leader: "00000001",orgs:["2","1"]},
  {id: "3", name: "112排", belong: "2",  leader: "00000002",orgs:["3","2","1"]},
  {id: "4", name: "12班",  belong: "3",  leader: "00000003",orgs:["4","3","2","1"]},
  {id: "5", name: "177连", belong: "1",  leader: "00000007",orgs:["5","1"]},
  {id: "6", name: "107排", belong: "5",  leader: "00000008",orgs:["6","5","1"]},
  {id: "7", name: "19班",  belong: "6",  leader: "00000009",orgs:["7","6","5","1"]}
];

/*
 insert  orgnizations
*/
  db.orgList.remove({}, function () {
      db.orgList.insert(orgsList,function(err,results){
        console.log(results);
        db.close();
      });
});
