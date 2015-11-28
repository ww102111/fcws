angular.module('fcws.controllers')
.controller('TrainRuleCtrl', function($scope,$rootScope,Docs) {
  $scope.docs = [
    {
      name: "最高人民法院关于审理破坏公用电信设施刑事案件具体应用法律若干问题的解释",
      url: "train\/rules\/top-public-method.html"
    },
    {
      name: "中华人名共和国军事设施保护法实施办法",
      url: "train\/rules\/china-protect-method.html"
    }
  ];

  $scope.showDoc = function (doc) {
      Docs.showDoc($scope,doc);
  };
});
