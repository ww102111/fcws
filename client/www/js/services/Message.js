angular.module('fcws.services')
  .factory('Message', function($q,$http ,$log,SERVER) {

    return {
      //get message count
      getMessageCount: function(userid,token) {
        return $http.get(SERVER.api + '/'+ userid+'/messages/count', {
          method: 'GET',
          params: {
            token: token
          }
        });
      },

      //mark all messages to read
      markAllMessages: function(userid,token) {
        return $http.post(SERVER.api + '/'+ userid+'/messages/mark',null,{
          method: 'POST',
          params: {
            token: token
          }
        });
      },

        //get all messages of a user
        getMessages: function(userid,token) {
          return $http.get(SERVER.api + '/'+ userid +'/messages', {
            method: 'GET',
            params: {
              token: token
            }
          });
        },

        // //set a message to state has_read
        // readMessage: function(id,token) {
        //   return $http.post(SERVER.api+ '/message/' + id,null, {
        //     method: 'POST',
        //     params: {
        //         token: token
        //     }
        //   });
        // },

        //send a message
        sendAMessage: function(form,token) {
          return $http.post(SERVER.api + '/message', form, {
            method: 'POST',
            params: {
                token: token
            }
          });
        },

        //send a broadcast
        sendBroadcast: function(form,token) {
          return $http.post(SERVER.api + '/messages', form, {
            method: 'POST',
            params: {
                token: token
            }
          });
        }
    };
});
