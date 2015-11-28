angular.module('fcws.controllers')
.controller('SidemenuCtrl', function($scope,User,$rootScope) {
    // $scope.username = User.getUserTitle()+"-"+User.getUserName();

    $scope.username = User.getUserName();
    $scope.title = User.getUserTitle();
    $rootScope.$on('login', function() {
      $scope.username = User.getUserName();
      $scope.title = User.getUserTitle();
    });
});
