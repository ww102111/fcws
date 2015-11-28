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
          var url = SERVER.api+"/leaders/"+ id;
          console.log(url);
          return $http.get(url, {
            method: 'GET',
            params: {
                token: token
            }
          });
        },
        //获取下属部队
        getTroops: function(id,token) {
          var url = SERVER.api+"/troops/"+ id;
          console.log(url);
          return $http.get(url, {
            method: 'GET',
            params: {
                token: token
            }
          });
        }
      };
    });
