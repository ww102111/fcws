angular.module('fcws.controllers')
.controller('ContactUnitCtrl', function($scope) {
  $scope.users = [
      {"name":"用户AAA",
       "avatar": "img/commander.jpg",
       "phone": "159923123"
     },
      {"name":"用户BBB",
      "avatar": "img/commander.jpg",
      "phone": "159923123"
     },
      {"name":"用户CCC",
      "avatar": "img/soilder.jpg",
      "phone": "159923123"
     },
      {"name":"用户DDD",
      "avatar": "img/soilder.jpg",
      "phone": "159923123"
     }
    ];
});
