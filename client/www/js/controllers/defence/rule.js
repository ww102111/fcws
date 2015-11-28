angular.module('fcws.controllers')
.controller('DefenceRuleCtrl', function($scope,Docs) {
  $scope.docs = [
    {
      name: "关于扎实做好廉洁征兵工作的通知",
      url: "defence\/rule\/call_notice.html"
    },
    {
      name: "中国首支维和步兵营先遣分队144名官兵出征",
      url: "defence\/rule\/china_sailout.html"
    }
  ];
  $scope.showDoc = function (doc) {
      Docs.showDoc($scope,doc);
  };
});
