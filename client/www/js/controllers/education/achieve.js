angular.module('fcws.controllers')
.controller('EducationAchieveCtrl', function($scope,Docs) {
  $scope.docs = [
    {
      name: "第二炮兵某部五连“班长讲坛”放飞新兵成才梦",
      url: "education\/achieve\/second_dream.html"
    },
    {
      name: "沈阳军区某旅冬训：600名新兵挺进林海雪原",
      url: "education\/achieve\/shengyang_new.html"
    }
  ];
  $scope.showDoc = function (doc) {
      Docs.showDoc($scope,doc);
  };
});
