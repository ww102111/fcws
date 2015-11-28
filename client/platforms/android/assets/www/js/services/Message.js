angular.module('fcws.services')
  .factory('Message', function($q,$http ,$log,SERVER) {

    return {
      //get message count
      getMessageCount: function(userid,token) {
        return $http.get(SERVER.api + '/messages/'+ userid+'/unreadCount');
      },

      //mark all messages to read
      markAllMessages: function(userid,token) {
        return $http.post(SERVER.api + '/messages'+ userid+'/markAllRead');
      },

        //get all messages of a user
        getMessages: function(userid,token) {
          return $http.get(SERVER.api + '/messages/'+ userid);
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
          return $http.post(SERVER.api + '/messages', form);
        },

        //send a broadcast
        sendBroadcast: function(form,token) {
          return $http.post(SERVER.api + '/messages/send', form, {
            method: 'POST',
            params: {
                token: token
            }
          });
        }
    };
});
