angular.module('fcws.controllers')
.controller('ControlGroupCtrl', function($scope,$rootScope,Orgnizations,User,$ionicModal,Message,$filter) {

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
          Orgnizations.getTroops(User.getBelong(),User.getToken())
          .success(function (data) {
                console.log(JSON.stringify(data));
                $scope.troops = data;
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
      $scope.showNewMessageModal = function(troop) {
        $scope.newMessage.sendTo = troop.name;
        $scope.newMessage.content = "";
        $scope.newMessage.receiver = troop;
        $scope.newMessageModal.show();
      };

      //close new message modal
      $scope.closeNewMessageModal = function() {
        $scope.newMessageModal.hide();
        $scope.newMessage.content = "";
      };

      $scope.createNewMessage = function(groupId,cont) {
        var content = cont;
        var date = new Date();
        var createDate = $filter('date')(date, 'yyyy-MM-dd HH:mm:ss');
        //  var avatar = User.getUserAvatar();

        var form = {
          // id: id,
          senderName: User.getUserName(),
          senderTitle: User.getUserTitle(),
          senderId: User.getUserId(),
          groupId : groupId,
          content: content,
          has_read: false,
          createDate: createDate
        };

        Message.sendBroadcast(form, User.getToken())
          .success(function(data, status, headers, config) {
            $rootScope.notify("广播信息发送成功");
            console.log("广播信息发送成功: "+ groupId+" "+ content);
            $scope.newMessageModal.hide();
          })
          .error(function(data, status, headers, config) {
            $rootScope.notify("广播信息发送失败");
            console.log("网络出错，发送失败");
          });
      };
});
