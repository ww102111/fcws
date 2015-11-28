angular.module('fcws.controllers')
.controller('ContactUserdefineCtrl', function($scope) {
  $scope.users = [
      {"name":"用户A",
       "avatar": "img/commander.jpg",
       "phone": "159923123"
     },
      {"name":"用户B",
      "avatar": "img/soilder.jpg",
      "phone": "159923123"
     },
      {"name":"用户C",
      "avatar": "img/commander.jpg",
      "phone": "159923123"
     }
    ];
});
