var validateRequest = require("../../middlewares/validateRequest");
var eventproxy = require('eventproxy');

module.exports = function(server, db) {
    //get orgnizations
  server.get("/api/v1/troops/:groupId", function(req, res, next) {
    validateRequest.validate(req, res, db, function() {

      var groupId = req.params.groupId;

      db.orgList.find({
        belong: groupId
      }, function(err, orgs) {

        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8'
        });

        res.end(JSON.stringify(orgs));
      });
    });
  });



// get the commanders of the troops you can give an order
  server.get("/api/v1/leaders/:groupId", function(req, res, next) {
    validateRequest.validate(req, res, db, function() {

      var groupId = req.params.groupId;

      db.orgList.find({
        belong: groupId
      }, function(err, orgs) {

        if (err) {
          next(err);
        }

        var ep = new eventproxy();

        ep.after('getBelong', orgs.length, function(users) {
          res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
          });

          res.end(JSON.stringify(users));
        });

        orgs.forEach(function(org) {
          db.userList.findOne({
            id: org.leader
          }, function(err, user) {
            if (err) {
              next(err);
            }
            user.password = undefined;
            ep.emit('getBelong', user);
          });
        });

      });
    });
    return next();
  });
};
