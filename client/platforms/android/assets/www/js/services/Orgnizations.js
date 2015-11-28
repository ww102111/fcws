angular.module('fcws.services')
  .factory('Orgnizations', function($http,SERVER) {
      return {
        // getOrgnizationsFromServer: function() {
        //   var url = SERVER.orgs+ '/' + "config.json";
        //   console.log(url);
        //   return $http.get(url);
        // },
        //获取下属信息
        getLeaders: function(id,token) {
          var url = SERVER.api+"/orgs/leaders/"+ id;
          return $http.get(url);
        },
        //获取下属部队
        getTroops: function(id,token) {
          var url = SERVER.api+"/orgs/troops/"+ id;
          return $http.get(url);
        }
      };
    });
