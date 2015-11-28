angular.module('fcws.controllers')
/*
Controller for our 教育管理
*/
.controller('EducationPlanCtrl', function($scope,Docs) {
  $scope.docs = [
    {
      name: "武警广西总队某支队官兵春节过后植树忙",
      url: "education\/plan\/guangxi_busy.html"
    },
    {
      name: "护林兵：就为万家灯火团圆",
      url: "education\/plan\/hulinbin.html"
    }
  ];
  $scope.showDoc = function (doc) {
      Docs.showDoc($scope,doc);
  };
});
