angular.module('fcws.services')
.factory('API', function ($rootScope, $http, $ionicLoading, $window,SERVER) {
        $rootScope.show = function (text) {

            $rootScope.loading = $ionicLoading.show({
                template: text ? text : '读取中',
            });
        };

        $rootScope.hide = function () {
            $ionicLoading.hide();
        };

        // $rootScope.logout = function () {
        //     $rootScope.setToken("");
        //     $window.location.href = '#/auth/signin';
        // };

        $rootScope.notify =function(text){
            $rootScope.show(text);
            $window.setTimeout(function () {
              $rootScope.hide();
            }, 999);
        };

        $rootScope.doRefresh = function (tab) {
            if(tab == 1)
                $rootScope.$broadcast('fetchAll');
            else
                $rootScope.$broadcast('fetchCompleted');

            $rootScope.$broadcast('scroll.refreshComplete');
        };

        // $rootScope.setToken = function (token) {
        //     return ($window.localStorage.token = token);
        // };
        //
        // $rootScope.getToken = function () {
        //     return $window.localStorage.token;
        // };
        //
        // $rootScope.isSessionActive =function () {
        // return $window.localStorage.token ? true : false;
        // };

        return {
          
          };
});
