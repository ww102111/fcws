angular.module('fcws.controllers')
.controller('TrainSearchCtrl', function($scope,$state,User,Docs) {

  $scope.docs = [
    {
      name: "中华人民共和国电信条例相关条款",
      url: "train\/rules\/china-mobile-related.html"
    },
    {
      name: "中国人民解放军电磁频道管理条例",
      url: "train\/rules\/china-chanel-related.html"
    }
  ];
  // $scope.docs = [
  //   {
  //     name: "指挥体制"
  //   },
  //   {
  //     name: "着力加强基层武装部建设"
  //   },
  //   {
  //     name: "用优良作风为强军目标提供坚强保证"
  //   },
  //   {
  //     name: "围绕应急赢战强队伍"
  //   },
  //   {
  //     name: "提高预备役部队实战化训练水平"
  //   },
  //   {
  //     name: "民兵队伍要动态建常态用"
  //   },
  //   {
  //     name: "坚持把发展军事职业教育作为战略性基础工程"
  //   },
  //   {
  //     name: "用好不穿军装的兵"
  //   },
  //   {
  //     name: "构建后辈力量遂行多样化任务长效机制"
  //   },
  //   {
  //     name: "对在军事训练中做好预备役部队的思想政治工作"
  //   }
  // ];
  $scope.showDoc = function (doc) {
      Docs.showDoc($scope,doc);
  };
});
