angular.module('fcws.controllers')
.controller('TrainExamCtrl', function($scope,$state,User,Docs) {
  $scope.docs = [
    {
      name: "邮电部关于损坏通信线路",
      url: "train\/rules\/about-mobile-broken.html"
    },
    {
      name: "我国学生军事训练有关法律法规及重要文件节录",
      url: "train\/rules\/student-train-important.html"
    },
    {
      name: "国务院、中央军委关于保护通信线路的规定",
      url: "train\/rules\/center-protect-rule.html"
    }
  ];
  $scope.showDoc = function (doc) {
      Docs.showDoc($scope,doc);
  };

});
