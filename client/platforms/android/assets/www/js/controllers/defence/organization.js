angular.module('fcws.controllers')
.controller('DefenceOrganizationCtrl', function($scope,Docs) {
  $scope.docs = [
    {
      name: "不叫苦，不掉队：“95后”新兵雪地拉练",
      url: "defence\/organization\/95_snow_train.html"
    },
    {
      name: "满洲里十八里哨所：守卫祖国之门",
      url: "defence\/organization\/guard_gate.html"
    }
  ];
  $scope.showDoc = function (doc) {
      Docs.showDoc($scope,doc);
  };
});
