angular.module('fcws.controllers')
.controller('EducationEduCtrl', function($scope,Docs) {
  $scope.docs = [
    {
      name: "兰州军区某防化团假期应急演练救治“伤员”",
      url: "education\/edu\/lanzhou_injured.html"
    },
    {
      name: "沈阳军区某特种作战团官兵顶风冒雪练侦察技能",
      url: "education\/edu\/shengyang_special.html"
    }
  ];
  $scope.showDoc = function (doc) {
      Docs.showDoc($scope,doc);
  };
});
