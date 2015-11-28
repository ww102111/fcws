angular.module('fcws.controllers')
.controller('ContactWorkCtrl', function($scope) {
  $scope.users = [
      {"name":"小张",
       "avatar": "img/soilder.jpg",
       "phone": "159923123"
     },
      {"name":"小红",
      "avatar": "img/soilder.jpg",
      "phone": "159923123"
     },
      {"name":"小明",
      "avatar": "img/commander.jpg",
      "phone": "159923123"
     },
      {"name":"用户D",
      "avatar": "img/commander.jpg",
      "phone": "159923123"
     },
      {"name":"用户E",
      "avatar": "img/soilder.jpg",
      "phone": "159923123"
     },
      {"name":"用户F",
      "avatar": "img/soilder.jpg",
      "phone": "159923123"
     }
    ];
});
