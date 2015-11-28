angular.module('fcws.services')
  .factory('Post', function($q,$localstorage,$log,$rootScope,User,$http,SERVER) {
    return {

      
      getPost: function(id) {
        var token = User.getToken();
        return $http.get(SERVER.api+ '/posts/' + id);
      },

      deletePost: function(id) {
        var token = User.getToken();
        return $http.delete(SERVER.api + '/posts/' + id);
      },

      saveReply: function(id,reply) {
        var token = User.getToken();
        return $http.post(SERVER.api + '/replys', reply);
      },

      deleteReply: function(replyId,postId) {
        var token = User.getToken();
        return $http.delete(SERVER.api + '/replys/'+replyId);
      },

      likePost: function (id) {
        var token = User.getToken();
        return $http.post(SERVER.api + '/posts/like/'+id);
      }
    //  updateFromServer: updateFromServer,
    };
  });
