angular.module('fcws.services')
  .factory('Contact', function($q,$localstorage,$log,$rootScope,SERVER,$http) {
    // var taizhou = {
    //   areas : [
    //     {
    //         towns : [
    //           {
    //
    //           }
    //         ]
    //     },
    //     {
    //         towns : []
    //     }
    //   ]
    // }
  	return {
  		getUserContacts: function () {
  			var url = SERVER.api+'/contacts';
          	return $http.get(url);
  		}
    //   ,
    //   getAreas : function () {
    //
    //   }
    };  
  });
