angular.module('fcws.services')
  .factory('User', function($q,$localstorage,$log,$rootScope,SERVER,$http) {
    var userKey = 'user';
    var isAuthenticatedKey = 'isAuthenticated';
    var user = $localstorage.get(userKey);
    return {
      signin: function (form) {
          var url = SERVER.api+'/users/login';
          console.log(url);
          return $http.post(url, form);
      },
      signup: function (form) {
          var url = SERVER.api+'/users/register';
          console.log(url);
          return $http.post(url, form);
      },
      //confirm that the inputed password is same as the user's passwod
      confirmPassword: function (form) {
        var url = SERVER.api+'/users/confirmPassword';
        console.log(url);
        return $http.post(url, form);
      },
      //change the password
      changePassword: function (form) {
        var url = SERVER.api+'/users/changePassword';
        console.log(url);
        return $http.post(url, form);
      },
      getDetail : function () {
        //var token = this.getToken();
        //var id = this.getUserId();

        // return $http.get(SERVER.api+ '/user/' + id, {
        //   method: 'GET',
        //   params: {
        //       token: token
        //   }
        // });
        var url = SERVER.api+'/users/details/' + this.getUserId;
        console.log(url);
        return $http.post(url);
      },
      loginUser: function (_id,id,name,title,belong,isLeader) {
          $log.log(_id + " " + id + " " + name + " " + title+" "+ belong+ " "+ isLeader);
          $localstorage.set(userKey,{_id:_id,id:id,name:name,title:title,belong:belong,isLeader:isLeader});
          $localstorage.set(isAuthenticatedKey,true);
          user = $localstorage.get(userKey);
          $rootScope.$broadcast('login');
      },
      logoutUser: function () {
        $localstorage.remove(userKey);
        $localstorage.set(isAuthenticatedKey,false);
      },
      isAuthenticated: function () {
          return $localstorage.get(isAuthenticatedKey);
      },
      getId : function () {
          return user._id+"";
      },
      getUserId : function () {
          return user.id+"";
      },
      getUserTitle : function () {
        return user.title || "";
      },
      getUserName: function(){
          return user.name || "欢迎";
      },
      getBelong : function () {
          return user.belong;
      },
      isLeader: function () {
          return user.isLeader;
      },
      getToken: function () {
        //set email as token temperarily
          return user.id;
      }
    };
  });
