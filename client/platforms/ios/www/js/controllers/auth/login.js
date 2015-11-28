angular.module('fcws.controllers')
/*
Controller for the Splash page
*/
.controller('LogInCtrl', function($rootScope, $scope, $window,User,API) {
      // if the user is already logged in, take him to his bucketlist
    // if ($rootScope.isSessionActive()) {
    //   $window.location.href = ('#/sidemenu/dashboard');
    // }

    $scope.user = {
      id : "",
      password : ""
    };

    // $scope.validateUser = function() {
    //   $window.location.href = ('#/sidemenu/dashboard');
    // };
//
  $scope.validateUser = function() {
    var id = this.user.id;
    var password = this.user.password;
    if (!id || !password) {
      $rootScope.notify("请输入完整信息");
      return false;
    }

    $rootScope.show('登录中...请稍候');
    User.signin({
      id: id,
      password: password
    }).success(function(data) {
    //  $rootScope.setToken(email); // create a session kind of thing on the client side
//      localStorage.isAuthenticated = true;
      // localStorage.authToken = data._id;
      // localStorage.username = data.name;
  //    console.log(data._id+" "+data.name+" "+data.email);
      User.loginUser(data._id,data.id,data.name,data.title,data.belong,data.isLeader);
      $rootScope.hide();
      $window.location.href = ('#/sidemenu/dashboard');
    }).error(function(error) {
      $rootScope.hide();
      $rootScope.notify("无效的用户名或密码");
    });
    //   $window.location.href = ('#/sidemenu/dashboard');
   };


});
