angular.module('fcws.controllers')
.controller('DefenceCallCtrl', function($scope,Docs) {
  $scope.docs = [
    {
      name: "2015年灵川县征兵宣传“一条街”活动",
      url: "defence\/call\/one_street.html"
    },
    {
      name: "教育部出台六项新举措 激励高校学生参军报国",
      url: "defence\/call\/six_new_actions.html"
    }
  ];
  $scope.showDoc = function (doc) {
      Docs.showDoc($scope,doc);
  };
});
