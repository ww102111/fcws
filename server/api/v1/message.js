var eventproxy  = require('eventproxy');

module.exports = function(server, db) {
    var validateRequest = require("../../middlewares/validateRequest");

    //add a message
    server.post('/api/v1/message', function(req, res, next) {
      validateRequest.validate(req, res, db, function() {
        var message = req.params;
        db.messageList.save(message,
          function(err, data) {
            res.writeHead(200, {
              'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(data));
          });
      });
      return next();
    });

    //send messages
    server.post('/api/v1/messages', function(req, res, next) {
      validateRequest.validate(req, res, db, function() {
        var message = req.params;
        var orgId = message.groupId;
        message.groupId = undefined;
        console.log("get messages");
        db.userList.find({orgs:orgId},function (err,users) {
            console.log(users);
            var ep = new eventproxy();

            ep.after("message", users.length,function (messages) {
              res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
              });
              res.end(JSON.stringify({success:true}));
            });


            users.forEach(function (user) {
                console.log(user.id);
                var singleMessage = new Object({});
                singleMessage.senderName = message.senderName;
                singleMessage.senderTitle = message.senderTitle;
                singleMessage.senderId = message.senderId;
                singleMessage.receiver_id = user.id;
                singleMessage.content= message.content;
                singleMessage.has_read= message.has_read;
                singleMessage.createDate= message.createDate;
                db.messageList.save(singleMessage,
                  function(err, data) {
                    if(err){
                      console.log(err);
                      next(err);
                    }
                    console.log(data);
                    ep.emit('message',data);
                  });
            });
        });

      });
      return next();
    });

    //get messages of a user
    server.get("/api/v1/:user_id/messages", function(req, res, next) {
      validateRequest.validate(req, res, db, function() {
        var user_id = req.params.user_id;
        db.messageList.find({receiver_id:user_id}).sort({createDate:-1}, function(err, list) {
          if(err){
            next(err);
          }
          var messages = {
            has_read_messages: [],
            hasnot_read_messages: []
          };

          for(var i=0,l=list.length; i<l; i++){
              var message = list[i];
              if(message.has_read){
                messages.has_read_messages.push(message);
              }else{
                messages.hasnot_read_messages.push(message);
              }
          }
          // console.log(list);
          res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
          });
          res.end(JSON.stringify(messages));
        });
      });
      return next();
    });

    //mark all messages of a user to has_read
    server.post('/api/v1/:user_id/messages/mark', function(req, res, next) {
      validateRequest.validate(req, res, db, function() {
        var user_id = req.params.user_id;
        db.messageList.find({receiver_id:user_id,has_read:false}, function(err, list) {
          //TODO:here can be replaced by asynomous code

          for(var i=0,l=list.length; i<l; i++){
            var message = list[i];
            message.has_read = true;
            db.messageList.save(message, function(err, data) {
              if(err){
                next(err);
              }
            });
          }
          res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
          });
          //res.status(200);
          res.end(JSON.stringify({success:true}));
        });
      });
      return next();
    });

    //get count of messages unread
    server.get("/api/v1/:user_id/messages/count", function(req, res, next) {
      validateRequest.validate(req, res, db, function() {
        var user_id = req.params.user_id;
        db.messageList.find({receiver_id:user_id,has_read:false}, function(err, list) {
          var count = list.length;
          // console.log(list);
          res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
          });
          res.end(JSON.stringify({count:count}));
        });
      });
      return next();
    });



};
