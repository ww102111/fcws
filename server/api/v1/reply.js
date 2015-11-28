module.exports = function(server, db) {
  var validateRequest = require("../../middlewares/validateRequest");

  //add a reply
  server.post('/api/v1/reply', function(req, res, next) {
    validateRequest.validate(req, res, db, function() {
      var reply = req.params;
      var postId = reply.postId;
      console.log(postId);
      db.replyList.save(reply,
        function(err,reply) {
          if(err){
            next(err);
          }
          // res.writeHead(200, {
          //     'Content-Type': 'application/json; charset=utf-8'
          //   });
          // res.end(JSON.stringify(data));

          // update post replyCount
          db.postList.findOne({
            _id: db.ObjectId(postId)
          }, function(err, post) {
            if(err){
              next(err);
            }
            post.replyCount++;
            //save post
            db.postList.save(post, function(err, data) {
              if(err){
                next(err);
              }
              res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
              });
              res.end(JSON.stringify(data));
            });
          });
        });
    });
    return next();
  });


  //delete a reply
  server.del('/api/v1/reply/:reply_id', function(req, res, next) {
    var replyId = req.params.reply_id;
    var postId = req.params.postId;
    validateRequest.validate(req, res, db, function() {
      db.replyList.remove({
        _id: db.ObjectId(replyId)
      }, function(err, reply) {
        console.log(postId);
        if(err){
          next(err);
        }
        // res.writeHead(200, {
        //     'Content-Type': 'application/json; charset=utf-8'
        //   });
        // res.end(JSON.stringify(data));


        //update post replyCount
        db.postList.findOne({
          _id: db.ObjectId(postId)
        }, function(err, post) {
          if(err){
            next(err);
          }
          post.replyCount--;
          //save post
          db.postList.save(post, function(err, data) {
            if(err){
              next(err);
            }
            res.writeHead(200, {
              'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(data));
          });
        });
      });
      return next();
    });
  });



};
