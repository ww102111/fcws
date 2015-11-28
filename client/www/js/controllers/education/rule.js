angular.module('fcws.controllers')
.controller('EducationRuleCtrl', function($scope,Docs) {
  $scope.docs = [
    {
      name: "武警陕西总队新兵体验“钢铁是怎样炼成”",
      url: "education\/rule\/shanxi_steel.html"
    },
    {
      name: "新疆喀什：边防新兵隆冬时节练兵忙",
      url: "education\/rule\/xinjiang.html"
    }
  ];
  $scope.showDoc = function (doc) {
      Docs.showDoc($scope,doc);
  };
});
