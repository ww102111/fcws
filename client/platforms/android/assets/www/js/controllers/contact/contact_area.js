angular.module('fcws.controllers')
.controller('ContactAreaCtrl', function($scope, $rootScope, Contact) {
  $scope.areas =[
    {
        "name" : "泰兴市",
    },
    {
        "name" : "高港区",
    },
    {
        "name" : "姜堰区",
    },
    {
        "name" : "靖江",
    },
    {
        "name" : "兴化",
    },
    {
        "name" : "海陵区",
    }
  ];
});
