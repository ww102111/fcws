angular.module('fcws.services')
  .factory('Post', function($q,$localstorage,$log,$rootScope,User,$http,SERVER) {
    return {

      
      getPost: function(id) {
        var token = User.getToken();
        return $http.get(SERVER.api+ '/post/' + id, {
          method: 'GET',
          params: {
              token: token
          }
        });
      },

      deletePost: function(id) {
        var token = User.getToken();
        return $http.delete(SERVER.api + '/post/' + id, {
          method: 'DELETE',
          params: {
            token: token
          }
        });
      },

      saveReply: function(id,reply) {
        var token = User.getToken();
        return $http.post(SERVER.api + '/reply', reply, {
          method: 'POST',
          params: {
              token: token
          }
        });
      },

      deleteReply: function(replyId,postId) {
        var token = User.getToken();
        return $http.delete(SERVER.api + '/reply/'+replyId, {
          method: 'DELETE',
          params: {
              token: token,
              postId: postId
          }
        });
      },

      likePost: function (id) {
        var token = User.getToken();
        return $http.post(SERVER.api + '/post/'+id+'/likes',null,{
          method: 'POST',
          params: {
              token: token
          }
        });
      }
    //  updateFromServer: updateFromServer,
    };
  });
