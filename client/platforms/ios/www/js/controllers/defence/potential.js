angular.module('fcws.controllers')
.controller('DefencePotentialCtrl', function($scope,Docs) {
  $scope.docs = [
    {
      name: "解放军护航编队强大火力逼降疑似海盗船",
      url: "defence\/potential\/army_close_board.html"
    },
    {
      name: "北京军区组织重装部队进行高寒地区复杂条件下实战化演",
      url: "defence\/potential\/beijing_train.html"
    }
  ];
  $scope.showDoc = function (doc) {
      Docs.showDoc($scope,doc);
  };
});
