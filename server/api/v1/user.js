var pwdMgr = require('../../middlewares/managePasswords');
var validateRequest = require("../../middlewares/validateRequest");

var eventproxy = require('eventproxy');

var recentCount = 5;

module.exports = function(server, db) {
  // unique index
  db.userList.ensureIndex({
    id: 1
  }, {
    unique: true
  });


  //get user detail
  server.get('/api/v1/user/:user_id', function(req, res, next) {
    validateRequest.validate(req, res, db, function() {
      var userid = req.params.user_id;
      console.log(userid);
      var ep = new eventproxy();

      ep.all("user","recent_posts","recent_replies", function (user,recent_posts,recent_replies) {
          user.password = undefined;
          user.recent_posts = recent_posts;
          user.recent_replies = recent_replies;

          res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
          });
          res.end(JSON.stringify(user));
      });

      ep.fail(next);

      //get user info
      db.userList.findOne({id: userid},ep.done("user"));

      //get posts of this user; limited to 5 posts
      db.postList.find({userId: userid}).sort({createDate:-1}).limit(recentCount,ep.done("recent_posts"));
      //get replies of this user; limited to 5 replies
      db.replyList.find({userId: userid}).sort({createDate:-1}).limit(recentCount,ep.done("recent_replies"));

    });
    return next();
  });

  server.post('/api/v1/auth/register', function(req, res, next) {
    var user = req.params;
    pwdMgr.cryptPassword(user.password, function(err, hash) {
      user.password = hash;
      db.userList.insert(user,
        function(err, dbUser) {
          if (err) { // duplicate key error
            if (err.code == 11000) /* http://www.mongodb.org/about/contributors/error-codes/*/ {
              res.writeHead(400, {
                'Content-Type': 'application/json; charset=utf-8'
              });
              res.end(JSON.stringify({
                error: err,
                message: "A user with this id already exists"
              }));
            }
          } else {
            res.writeHead(200, {
              'Content-Type': 'application/json; charset=utf-8'
            });
            dbUser.password = "";
            res.end(JSON.stringify(dbUser));
          }
        });
    });
    return next();
  });

  server.post('/api/v1/auth/login', function(req, res, next) {
    var user = req.params;
    if (user.id.trim().length === 0 || user.password.trim().length === 0) {
      res.writeHead(403, {
        'Content-Type': 'application/json; charset=utf-8'
      });
      res.end(JSON.stringify({
        error: "Invalid Credentials"
      }));
    }
    db.userList.findOne({
      id: req.params.id
    }, function(err, dbUser) {
      pwdMgr.comparePassword(user.password, dbUser.password, function(err, isPasswordMatch) {
        if (isPasswordMatch) {
          res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
          });
          // remove password hash before sending to the client
          dbUser.password = "";
          res.end(JSON.stringify(dbUser));
        } else {
          res.writeHead(403, {
            'Content-Type': 'application/json; charset=utf-8'
          });
          res.end(JSON.stringify({
            error: "Invalid User"
          }));
        }
      });
    });
    return next();
  });


  server.post('/api/v1/auth/confirmpw', function(req, res, next) {
    var user = req.params;
    console.log(user);
    if (user.id.trim().length === 0 || user.password.trim().length === 0) {
      res.writeHead(403, {
        'Content-Type': 'application/json; charset=utf-8'
      });
      res.end(JSON.stringify({
        error: "Invalid Credentials"
      }));
    }

    db.userList.findOne({
      id: req.params.id
    }, function(err, dbUser) {
      console.log(dbUser);
      pwdMgr.comparePassword(user.password, dbUser.password, function(err, isPasswordMatch) {
        console.log(isPasswordMatch);
        if (isPasswordMatch) {
          res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
          });
          res.end(JSON.stringify({success: true}));
        } else {
          res.writeHead(403, {
            'Content-Type': 'application/json; charset=utf-8'
          });
          res.end(JSON.stringify({
            error: "Invalid User"
          }));
        }

      });
    });
    return next();
  });

  server.post('/api/v1/auth/changepw', function(req, res, next) {
    var user = req.params;
    console.log(user);
    if (user.password.trim() !== user.repeat_password.trim()) {
      res.writeHead(403, {
        'Content-Type': 'application/json; charset=utf-8'
      });
      res.end(JSON.stringify({
        error: "Invalid Credentials"
      }));
    }

    db.userList.findOne({
      id: req.params.id
    }, function(err, dbUser) {
      console.log(dbUser);
      dbUser.password = user.password;

      db.userList.save(dbUser, function(err, data) {
        if(err){
          next(err);
        }
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify({success:true}));
      });
    });
    return next();
  });
};
