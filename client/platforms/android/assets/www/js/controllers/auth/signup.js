angular.module('fcws.controllers')
.controller('SignUpCtrl', function($rootScope, $scope, $window,User,API) {
  $scope.user = {
    id: "",
    name: "",
    title: "",
    password: "",
  };

    // $scope.createUser = function() {
    //   $window.location.href = ('#/sidemenu/dashboard');
    // };

  $scope.createUser = function() {
    var id = this.user.id;
    var uName = this.user.name;
    var title = this.user.title;
    var password = this.user.password;


    if (!id || !password || !uName || !title) {
      $rootScope.notify("请输入完整信息");
      return false;
    }
    $rootScope.show('正在注册，请稍等');
    User.signup({
      id: id,
      name: uName,
      title: title,
      password: password,
    }).success(function(data) {
//      $rootScope.setToken(email); // create a session kind of thing on the client side
      // localStorage.isAuthenticated = true;
      // localStorage.authToken = data._id;
      // localStorage.username = data.name;
      User.loginUser(data._id,data.id,data.name,data.title,data.belong,data.isLeader);
      $rootScope.hide();
      $window.location.href = ('#/sidemenu/dashboard');
    }).error(function(error) {
      $rootScope.hide();
      if (error.error && error.error.code == 11000) {
        $rootScope.notify("该编号已被注册");
      } else {
        $rootScope.notify("未知异常，请重试");
      }
    });
    //  $window.location.href = ('#/sidemenu/dashboard');
  };
});
