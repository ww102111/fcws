angular.module('fcws.services')
  .factory('Posts', function($q,$http ,SERVER,$log) {
    var posts = [];
    var nextPage = 1;
    var hasNextPage = true;
    var limit = 10;

    return {

      //get local posts
      getPosts: function() {
        return posts;
      },

      hasNextPage: function(has) {
        if (typeof has !== 'undefined') {
          hasNextPage = has;
        }
        return hasNextPage;
      },

      refresh: function() {
        console.log("refresh");
        var promise = $http.get(SERVER.api + '/posts');

        promise.success(function(response){
          hasNextPage = true;
          nextPage = 2;
          posts = response.data;
        });

        return promise;
      },

      pagination: function() {
        console.log("pagination");
        var promise = $http.get(SERVER.api + '/posts');

        promise.success(function(response){
          if(response.data.length < limit){
            console.log('posts length: ' + response.data.length);
            hasNextPage = false;
          }
          nextPage ++;
          posts = posts.concat(response.data);
        });

        return promise;
      },

      //   return getTopics(currentTab, nextPage, function(response) {
      //     if (response.data.length < 10) {
      //       $log.debug('response data length', response.data.length);
      //       hasNextPage = false;
      //     }
      //     nextPage++;
      //     topics = topics.concat(response.data);
      //   });
      // },

      // getById: function(id) {
      //   if (!!topics) {
      //     for (var i = 0; i < topics.length; i++) {
      //       if (topics[i].id === id) {
      //         return topics[i];
      //       }
      //     }
      //   } else {
      //     return null;
      //   }
      // },

      //get recent posts
      getRecent: function(token) {
        return $http.get(SERVER.api + '/posts');
      },

      // //get all posts -- not good
      // getAll: function(token) {
      //   return $http.get(SERVER.api + '/posts', {
      //     method: 'GET',
      //     params: {
      //       token: token
      //     }
      //   });
      // },
      //
      // //get a post
      // getOne: function(id,token) {
      //   return $http.get(SERVER.api+ '/post/' + id, {
      //     method: 'GET',
      //     params: {
      //         token: token
      //     }
      //   });
      // },

      //create a post
      saveItem: function(form,token) {
        return $http.post(SERVER.api + '/posts', form);
      },
    };
  });
