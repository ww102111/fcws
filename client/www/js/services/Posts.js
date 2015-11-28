angular.module('fcws.services')
  .factory('Posts', function($q,$http ,SERVER,$log,$localstorage) {
    var nextPage = 1;
    var hasNextPage = true;
    var limit = 10;
    var key = "posts";
    var posts =$localstorage.get(key) || [];

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
        var promise = $http.get(SERVER.api + '/posts',{
          params:{
            page: 1,
            limit : limit
          }
        });

        promise.success(function(response){
          hasNextPage = true;
          nextPage = 2;
          posts = response.data;
          $localstorage.set(key,posts);
        });

        return promise;
      },

      pagination: function() {
        console.log("pagination");
        var promise = $http.get(SERVER.api + '/posts',{
          params:{
            page: nextPage,
            limit : limit
          }
        });

        promise.success(function(response){
          if(response.data.length < limit){
            console.log('posts length: ' + response.data.length);
            hasNextPage = false;
          }
          nextPage ++;
          posts = posts.concat(response.data);
          $localstorage.set(key,posts);
        });

        return promise;
      },

      //get recent posts
      getRecent: function(token) {
        return $http.get(SERVER.api + '/recent', {
          method: 'GET',
          params: {
            token: token
          }
        });
      },

      //create a post
      saveItem: function(form,token) {
        return $http.post(SERVER.api + '/post', form, {
          method: 'POST',
          params: {
              token: token
          }
        });
      },
    };
  });
