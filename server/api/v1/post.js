var settings = require('../../settings');
var eventproxy = require('eventproxy');
var _          = require('lodash');
var validateRequest = require("../../middlewares/validateRequest");

module.exports = function(server, db) {

  //get recent posts
  server.get("/api/v1/recent", function(req, res, next) {
    validateRequest.validate(req, res, db, function() {
      db.postList.find({}).sort({createDate:-1}).limit(5, function(err, list) {
        //console.log(list);
        for(var i=0,l=list.length;i<l;i++){
          var post = list[i];
          post.likesCount = post.likes.length;
          //remove likes to make small package size
          post.likes = undefined;
        }
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(list));
      });
    });
    return next();
  });


  server.get("/api/v1/posts",function (req,res,next) {
      var page = parseInt(req.params.page,10) || 1;
      page = page > 0 ? page : 1;
      var limit = Number(req.params.limit) || settings.list_number_count;
      // var ep = new eventproxy();
      // ep.fail(next);
      //


      db.postList.find({}).skip(limit*(page-1)).limit(limit).sort({createDate:-1}).toArray(function(err,list){
         for(var i=0,l=list.length;i<l;i++){
        var post = list[i];
        post.likesCount = post.likes.length;
        post.likes = undefined;
      }
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify({data:list}));
      });

      // ep.all("posts",function (posts) {
      //     posts.forEach(function (post) {
      //       db.userList.find({_id:post.userId},ep.done(function (author) {
      //           post.author = _.pick(author,['name','title']);
      //           ep.emit("author");
      //       }));
      //     });

      //     ep.after("author",posts.length,function () {
      //         posts = posts.map(function(post) {

      //           return _.pick(post,['_id','userId','content','important','create_at']);

      //         })
      //     });
      // });

  });

  // //get all posts
  // server.get("/api/v1/posts", function(req, res, next) {
  //   validateRequest.validate(req, res, db, function() {
  //     db.postList.find({}).sort({createDate:-1}, function(err, list) {
  //       //console.log(list);
  //       for(var i=0,l=list.length;i<l;i++){
  //         var post = list[i];
  //         post.likesCount = post.likes.length;
  //         post.likes = undefined;
  //       }
  //       // console.log(list);
  //       res.writeHead(200, {
  //         'Content-Type': 'application/json; charset=utf-8'
  //       });
  //       res.end(JSON.stringify(list));
  //     });
  //   });
  //   return next();
  // });

  //get a post
  server.get('/api/v1/post/:post_id', function(req, res, next) {
    validateRequest.validate(req, res, db, function() {
      var postId = req.params.post_id;
      db.postList.findOne({
        _id: db.ObjectId(postId)
      }, function(err, post) {
        if(err){
          next(err);
        }

        db.replyList.find({
          postId: postId
        },function(err,list){
          if(err){
            next(err);
          }
          //console.log(list);
          post.replies = list;

        //  console.log(post);
          res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
          });
          res.end(JSON.stringify(post));
        });
      });
    });
    return next();
  });


  //add a post
  server.post('/api/v1/post', function(req, res, next) {
    validateRequest.validate(req, res, db, function() {
      var item = req.params;
      db.postList.save(item,
        function(err, data) {
          res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
          });
          res.end(JSON.stringify(data));
        });
    });
    return next();
  });

  //like a post
  server.post('/api/v1/post/:post_id/likes', function(req, res, next) {
    validateRequest.validate(req, res, db, function(user) {
      var postId = req.params.post_id;
      var userId = user.id;
      db.postList.findOne({
        _id: db.ObjectId(postId)
      }, function(err, post) {
        if (err) {
          return next(err);
        }
        if (!post) {
            res.status(404);
            return res.send({error_msg: 'post `' + postId + '` not found'});
        }

        var action;
        post.likes = post.likes || [];
        var likeIndex = post.likes.indexOf(userId+"");
        if (likeIndex === -1) {
          post.likes.push(userId+"");
          action = 'up';
        } else {
          post.likes.splice(likeIndex, 1);
          action = 'down';
        }
        db.postList.save(post, function(err, data) {
          if(err){
            next(err);
          }
          res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
          });
          //res.status(200);
          res.end(JSON.stringify({
            action: action
          }));
        });
      });
    });
    return next();
  });


  //update a post
  server.put('/api/v1/post/:id', function(req, res, next) {
    validateRequest.validate(req, res, db, function() {
      db.postList.findOne({
        _id: db.ObjectId(req.params.id)
      }, function(err, data) {
        // merge req.params/product with the server/product
        var updProd = {}; // updated products
        // logic similar to jQuery.extend(); to merge 2 objects.
        for (var n in data) {
          updProd[n] = data[n];
        }
        for (var num in req.params) {
          if (num != "id")
            updProd[num] = req.params[num];
        }
        db.postLists.update({
          _id: db.ObjectId(req.params.id)
        }, updProd, {
          multi: false
        }, function(err, data) {
          res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
          });
          res.end(JSON.stringify(data));
        });
      });
    });
    return next();
  });

  //delete a post
  server.del('/api/v1/post/:id', function(req, res, next) {
    validateRequest.validate(req, res, db, function() {
      db.postList.remove({
        _id: db.ObjectId(req.params.id)
      }, function(err, data) {
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(data));
      });
      return next();
    });
  });
};
