angular.module('fcws.controllers')
.controller('UserCtrl', function($scope,$rootScope,$state,User,API) {

  $scope.$on('$ionicView.beforeEnter', function() {
      $scope.loadUser();
  });

  $scope.loadUser = function () {
    $rootScope.show("正在读取用户数据,请稍等...");

    User.getDetail().success(function(data, status, headers, config) {
      $scope.user = data;
      $rootScope.hide();
    }).error(function(data, status, headers, config) {
      $rootScope.hide();
      $rootScope.notify("出错了!!请检查网络后重试");
    });
  };

  $scope.reloadUser = function () {
      $scope.loadUser();
      $rootScope.$broadcast('scroll.refreshComplete');
  };

});
