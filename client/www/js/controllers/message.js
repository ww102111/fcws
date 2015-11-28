angular.module('fcws.controllers')
.controller('MessageCtrl', function($scope,User,$ionicPopover,$ionicPopup,Message,$rootScope,API) {

  // before enter view event
  $scope.$on('$ionicView.beforeEnter', function() {
    // Load Messages
    loadMessages();
  });

  var loadMessages = function () {
    Message.getMessages(User.getUserId(),User.getToken()).success(function(data, status, headers, config) {
      //$rootScope.show("处理中,请稍等...");
      $scope.messages = data;
      console.log("messages : " + JSON.stringify(data));

      if ($scope.messages.hasnot_read_messages.length !== 0) {
        Message.markAllMessages(User.getUserId(), User.getToken()).success(function (response) {
            console.log('mark all response:', response);
            if(response.success){
              console.log("mark all responses successfully");
            }else{
              console.log("mark all responses fail");
            }
        });
      }
    }).error(function(data, status, headers, config) {
      //$rootScope.hide();
      $rootScope.notify("出错了!!请检查网络后重试");
    });
  }

  $scope.reloadMessages = function () {
    loadMessages();
    $rootScope.$broadcast('scroll.refreshComplete');
  }


  // An content show dialog
 $scope.showContent = function(message) {
   var alertPopup = $ionicPopup.alert({
     title: message.senderTitle+"-"+message.senderName,
     template: "<br>"+message.content+"<br><br>"+"<p>"+message.createDate+"</p>"
   });
   alertPopup.then(function(res) {
     //message.has_read = true;
     if(!message.has_read){
         Message.readMessage(message._id,User.getToken()).success(function(data, status, headers, config) {
            console.log("set read message: "+ data.has_read);
            message = data;
         }).error(function (data, status, headers, config) {
            $rootScope.notify("网络连接出错");
         })
         console.log('read message');
     }
   });
 };


 //popover style
  // // .fromTemplateUrl() method
  // $ionicPopover.fromTemplateUrl('my-popover.html', {
  //   scope: $scope
  // }).then(function(popover) {
  //   $scope.popover = popover;
  // });
  //
  //
  // $scope.openPopover = function($event,message) {
  //   $scope.selectMessage = message;
  //   $scope.popover.show($event);
  // };
  // $scope.closePopover = function() {
  //   console.log("close");
  //   $scope.selectMessage = null;
  //   $scope.popover.hide();
  // };


});
