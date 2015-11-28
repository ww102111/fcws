angular.module('fcws.controllers')
/*
Controller for the Splash page
*/
.controller('ChangepwCtrl', function($rootScope, $scope,User,API,$ionicHistory) {
  $scope.user = {
    password: "",
    repeat_password: ""
  };


  $scope.changePassword = function() {
    var id = User.getUserId();
    var password = this.user.password.trim();
    var repeat_password = this.user.repeat_password.trim();
    if(password !== repeat_password){
      $rootScope.notify("两次填写的密码不一致");
      return false;
    }

    $rootScope.show('验证中...请稍候');
    User.changePassword({
      id: id,
      password: password,
      repeat_password : repeat_password
    }).success(function() {

      $rootScope.hide();
      $ionicHistory.goBack();
      $rootScope.notify("密码修改成功");

    }).error(function(error) {
      $rootScope.hide();
      $rootScope.notify("密码输入错误");
    });
   };
});
