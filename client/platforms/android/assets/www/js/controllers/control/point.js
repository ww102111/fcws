angular.module('fcws.controllers')
.controller('ControlPointCtrl', function($scope,$rootScope,Orgnizations,User,$ionicModal,Message,$filter,API) {

    // before enter view event
    $scope.$on('$ionicView.beforeEnter', function() {
      // Load Orgnizations
      $scope.noData = false;
      loadLeaders();
    });

    var loadLeaders = function () {
      console.log("Loading Orgnizations...");
      console.log(User.isLeader());
      if(User.isLeader()){
        Orgnizations.getLeaders(User.getBelong(),User.getToken())
        .success(function (data) {
              console.log(JSON.stringify(data));
              $scope.leaders = data;
        })
        .error(function() {
          //$rootScope.notify("出错了!! 请检查网络后重试");
          console.log("log error");
        });
      }else{
        $scope.noData = true;
      }
    };

    $scope.newMessage = {
      content: ''
    };

    // Create the new  message modal
    $ionicModal.fromTemplateUrl('templates/control/messageModal.html', {
      animation: 'slide-in-up',
      scope: $scope
    }).then(function(modal) {
      $scope.newMessageModal = modal;
    });

    // show new message modal
    $scope.showNewMessageModal = function(leader) {
      $scope.newMessage.sendTo = leader.title+"-"+leader.name;
      $scope.newMessage.content = "";
      $scope.newMessage.receiver = leader;
      $scope.newMessageModal.show();
    };

    //close new message modal
    $scope.closeNewMessageModal = function() {
      $scope.newMessageModal.hide();
      $scope.newMessage.content = "";
    };

    // $scope.sendMessages = function (troop,content) {
    //   var receiverId = null;
    //   if(!troop.hasOwnProperty("troops")){
    //       receiverId = troop.id;
    //       createNewMessage(receiverId,content);
    //   }else {
    //       receiverId = troop.leader.id;
    //       createNewMessage(receiverId,content);
    //       var troops = troop.troops;
    //       for(var i = 0 ;i<troops.length; i++){
    //         $scope.sendMessages(troops[i],content);
    //       }
    //   }
    // };

    $scope.createNewMessage = function(receiverId,cont) {
      var content = cont;
      var date = new Date();
      var createDate = $filter('date')(date, 'yyyy-MM-dd HH:mm:ss');
      //  var avatar = User.getUserAvatar();

      var form = {
        // id: id,
        senderName: User.getUserName(),
        senderTitle: User.getUserTitle(),
        senderId: User.getUserId(),
        receiver_id : receiverId,
        content: content,
        has_read: false,
        createDate: createDate
      };

      Message.sendAMessage(form, User.getToken())
        .success(function(data, status, headers, config) {
          $rootScope.notify("消息发送成功!");
          console.log("发送信息成功: "+ receiverId+" "+ content);
          $scope.newMessageModal.hide();
        })
        .error(function(data, status, headers, config) {
          //$rootScope.notify("网络连接出错");
          $rootScope.notify("消息发送失败!");
          console.log("网络出错，发送失败");
        });
    };

});
