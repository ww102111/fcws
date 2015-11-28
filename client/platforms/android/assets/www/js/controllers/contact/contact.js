angular.module('fcws.controllers')
.controller('ContactCtrl', function($scope, $rootScope, Contact) {

  // $scope.$on('$ionicView.beforeEnter', function() {
  //     $scope.loadContacts();
  // });
  //
  // $scope.loadContacts = function () {
  //   //$rootScope.show("正在读取用户数据,请稍等...");
  //
  //   Contact.getUserContacts().success(function (data) {
  //     $scope.users = data;
  //     //$rootScope.hide();
  //   }).error(function (data) {
  //     //$rootScope.hide();
  //     //$rootScope.notify("出错了!!请检查网络后重试");
  //   });
  // };




  $scope.users = [
      {"name":"用户AAA",
       "avatar": "img/commander.jpg",
       "phone": "159923123"
     },
      {"name":"用户BBB",
      "avatar": "img/commander.jpg",
      "phone": "159923123"
     },
      {"name":"用户CCC",
      "avatar": "img/soilder.jpg",
      "phone": "159923123"
     },
      {"name":"用户DDD",
      "avatar": "img/soilder.jpg",
      "phone": "159923123"
     }
    ];
});
