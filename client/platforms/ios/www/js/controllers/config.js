angular.module('fcws.controllers')
  .controller('ConfigCtrl', function($scope, $rootScope,$state, User, $ionicPopup,API,$window) {
    $scope.logout = function() {
      User.logoutUser();
      $state.go('signin');
    };

    // Triggered on a button click, or some other target
    $scope.changePassword = function() {
      $scope.data = {};

      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: '<input type="password" ng-model="data.password">',
        title: '为保障你的数据安全，修改密码前请填写原密码',
        scope: $scope,
        buttons: [{
          text: '取消',
        }, {
          text: '<b>确定</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.password) {
              //don't allow the user to close unless he enters  password
              e.preventDefault();
            } else {
              validatePassword($scope.data.password);
              return $scope.data.password;
            }
          }
        }]
      });
      myPopup.then(function(res) {
        console.log('Tapped!', res);
      });
    };

    var validatePassword = function(res) {
      var id = User.getUserId();
      var password = res;

      $rootScope.show('验证中...请稍候');
      User.confirmPassword({
        id: id,
        password: password
      }).success(function() {
        $rootScope.hide();
        $window.location.href = ('#/sidemenu/changepw');
      }).error(function(error) {
        $rootScope.hide();
        $rootScope.notify("密码验证出错");
      });
     };


    $scope.shutdown = function() {
      ionic.Platform.exitApp();
    };
  });
