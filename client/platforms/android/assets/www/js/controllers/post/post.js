angular.module('fcws.controllers')
  .controller('PostCtrl', function($scope, Posts, $ionicPopup, User, $filter, $stateParams,
    $rootScope, API, $log, Post, $state,$ionicActionSheet,$timeout) {
    //force angular to create post object
    $scope.post = {
      id: "",
      token: "",
      user: "",
      title: "",
      content: "",
      important: false,
      date: "",
      likes: [],
      replies: []
    };


    var id = $stateParams.post_id;
    $scope.userId = User.getUserId();

    $scope.loadPost = function() {
      $rootScope.show("处理中,请等待...");
      Post.getPost(id)
        .success(function(data, status, headers, config) {
          $scope.post = data;
          $log.log(JSON.stringify($scope.post));
          $rootScope.hide();
        })
        .error(function(data, status, headers, config) {
          $rootScope.hide();
          $rootScope.notify("出错了!! 请检查网络后重试");
        });
    };
    $scope.loadPost();

    $scope.reloadPost = function () {
        $scope.loadPost();
        $rootScope.$broadcast('scroll.refreshComplete');
    };

    // $rootScope.$on('addComment', function() {
    // }

    $scope.Like = function() {
      $rootScope.show("正在点赞,请稍等...");
      Post.likePost(id)
      .success(function(response, status, headers, config) {
          //var user_id = User.getUserId();
          // if (response.action === 'up') {
          //   $scope.post.likes.push(user_id);
          // } else {
          //   $scope.post.likes.splice(user_id, 1);
          // }
          $scope.loadPost();
          $rootScope.hide();
        })
      .error(function(data, status, headers, config) {
          $rootScope.hide();
          $rootScope.notify("出错了!! 请检查网络后重试");
        });
    };

    $scope.isLike = function() {
      //console.log(JSON.stringify($scope.post));
      var user_id = User.getUserId();
      console.log(user_id);
      var indexUser = $scope.post.likes.indexOf(user_id);
      if (indexUser != -1) {
        return true;
      } else {
        return false;
      }
    };

    // $scope.isCreater = function() {
    //   var userToken = User.getToken();
    //   var postToken = $scope.post.token;
    //   return (userToken == postToken);
    // };

    $scope.replyData ={
      content : ""
    };
    //  modify
    $scope.addReply = function() {
      $rootScope.show("正在添加评论,请稍等...");

      var date = new Date();
      var createDate = $filter('date')(date, 'yyyy-MM-dd HH:mm:ss');
      var reply =
      {
        userId: User.getUserId(),
        userName: User.getUserName(),
        postId: id,
        content: $scope.replyData.content,
        createDate: createDate
      };

      Post.saveReply(id, reply)
        .success(function(data, status, headers, config) {
          $rootScope.hide();
          //$scope.post.comments.push(reply);
          //$rootScope.$broadcast('addComment');
          $scope.replyData.content = "";
          $scope.loadPost();
        }).error(function(data, status, headers, config) {
          $rootScope.hide();
          $rootScope.notify("出错了!! 请检查网络后重试");
        });
    };


    //delete post
    $scope.deletePost = function() {
      $rootScope.show("正在删除情报,请稍等...");
      Post.deletePost(id)
        .success(function(data, status, headers, config) {
          $rootScope.hide();
          $rootScope.$broadcast('fetchAll');
          $state.go('sidemenu.posts');
        }).error(function(data, status, headers, config) {
          $rootScope.hide();
          $rootScope.notify("出错了!! 请检查网络后重试");
        });
    };

    //delete reply
    $scope.deleteReply = function(reply) {
      $rootScope.show("正在删除评论,请稍等...");
      var reply_id = reply._id;
      console.log(reply_id);
      Post.deleteReply(reply_id,id)
        .success(function(data, status, headers, config) {
          $scope.loadPost();
          $rootScope.hide();
        }).error(function(data, status, headers, config) {
          $rootScope.hide();
          $rootScope.notify("出错了!! 请检查网络后重试");
        });
    };



    // delete post confirm dialog
    $scope.showDeletePostConfirm = function() {
      var confirmPopup = $ionicPopup.confirm({
        title: '确认删除？',
        template: '您确定要删除这个情报吗?'
      });
      confirmPopup.then(function(res) {
        if (res) {
          $log.log("sure to delete a post");
          $scope.deletePost();
        } else {
          $log.log('cancel delete a post');
        }
      });
    };

    // delete reply confirm dialog
    $scope.showDeleteReplyConfirm = function(reply) {
      var confirmPopup = $ionicPopup.confirm({
        title: '确认删除？',
        template: '您确定要删除这条回复吗?'
      });
      confirmPopup.then(function(res) {
        if (res) {
          $log.log("sure to delete a reply");
          $scope.deleteReply(reply);
        } else {
          $log.log('cancel delete a reply');
        }
      });
    };

    $scope.showActions = function (reply) {

        var title = "@"+ reply.userName;
        var DeleteButton = (User.getUserId() === reply.userId?"删除":"");
       // Show the action sheet
         var hideSheet = $ionicActionSheet.show({
           buttons: [
             { text: "回复" },
           ],
           destructiveText: DeleteButton,
           titleText: title,
           cancelText: '取消',
           cancel: function() {
           },
          destructiveButtonClicked: function () {
            $log.log("get here");
            $scope.showDeleteReplyConfirm(reply);
            return true;
          },
           buttonClicked: function(index) {
             if(index === 0){
                $scope.replyData.content = title+" ";
                $timeout(function() {
                  document.querySelector('.reply-new input').focus();
                }, 1);
             }
             return true;
           }
         });
      };




    //make reply dialog
    // $scope.makeComment = function() {
    //   $scope.data = {};
    //   // An elaborate, custom popup
    //   var myPopup = $ionicPopup.show({
    //     template: '<input type="text" ng-model="data.comment">',
    //     title: '我也说一句',
    //     scope: $scope,
    //     buttons: [{
    //       text: '取消'
    //     }, {
    //       text: '<b>发表</b>',
    //       type: 'button-positive',
    //       onTap: function(e) {
    //         if (!$scope.data.comment) {
    //           //don't allow the user to close unless he enters wifi password
    //           e.preventDefault();
    //         } else {
    //           return $scope.data.comment;
    //         }
    //       }
    //     }]
    //   });
    //   myPopup.then(function(res) {
    //     console.log('Tapped!', res);
    //     if (res) {
    //
    //     }
    //   });
    //   // $timeout(function() {
    //   //    myPopup.close(); //close the popup after 3 seconds for some reason
    //   // }, 3000);
    // };
  });
