angular.module('fcws.services')
  .factory('Docs', function($http,SERVER,$rootScope,API,PreviewService,$cacheFactory,$sce) {
    // var lruCache = $cacheFactory('lruCache',{ capacity : 1 });
    // var $httpDefaultCache = $cacheFactory.get('$http');
      return {
        getDocData: function (selectedDoc) {
          // get data
          var url = selectedDoc.url;
          var docUrl = SERVER.docs+ '/' + url;
          console.log(docUrl);
          return $http.get(docUrl,{
            cache: false
          });
        },
        showDoc :function($scope,doc) {
            $rootScope.show("正在从服务器获取数据,请稍等...");
            this.getDocData(doc)
            .success(function(data,status, headers, config) {
              //console.log(data);
              $scope.docHtml= $sce.trustAsHtml(data);
              //console.log($scope.docHtml);
              $rootScope.hide();
              PreviewService
                .init('templates/docModal.html', $scope)
                .then(function(modal) {
                  modal.show();
                });
            })
            .error(function(data, status, headers, config) {
              console.log("error: "+ status+" " +data);
              $rootScope.hide();
              $rootScope.notify("出错了!!请检查网络后重试");
            });

          },
          showDefalutDoc : function ($scope,docName) {
            //$rootScope.show("正在获取数据");
            $scope.docHtml= docName;
            PreviewService
              .init('templates/docModal.html', $scope)
              .then(function(modal) {
                modal.show();
              });
          }
      };
  });
