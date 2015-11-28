angular.module('fcws.controllers')
.controller('ContactTownCtrl', function($scope, $rootScope, Contact, $stateParams) {
    // var id = $stateParams.area_id;

    $scope.towns =[
      {
          "name" : "城北街道",
      },
      {
          "name" : "城北物流园",
      },
      {
          "name" : "城东街道",
      },
      {
          "name" : "城南街道",
      },
      {
          "name" : "城西街道",
      },
      {
          "name" : "城中街道",
      },
      {
          "name" : "罡杨镇",
      },
      {
          "name" : "京泰路街道",
      },
      {
          "name" : "九龙镇",
      },
      {
          "name" : "农业开发区",
      },
      {
          "name" : "苏陈镇",
      }
    ];


});
