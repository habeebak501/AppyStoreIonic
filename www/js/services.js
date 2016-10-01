angular.module('starter.services', [])

// .factory('Chats', function() {
//   // Might use a resource here that returns a JSON array
//
//   // Some fake testing data
//   var chats = [{
//     id: 0,
//     name: 'Ben Sparrow',
//     lastText: 'You on your way?',
//     face: 'img/ben.png'
//   }, {
//     id: 1,
//     name: 'Max Lynx',
//     lastText: 'Hey, it\'s me',
//     face: 'img/max.png'
//   }, {
//     id: 2,
//     name: 'Adam Bradleyson',
//     lastText: 'I should buy a boat',
//     face: 'img/adam.jpg'
//   }, {
//     id: 3,
//     name: 'Perry Governor',
//     lastText: 'Look at my mukluks!',
//     face: 'img/perry.png'
//   }, {
//     id: 4,
//     name: 'Mike Harrington',
//     lastText: 'This is wicked good ice cream.',
//     face: 'img/mike.png'
//   }];
//
//   return {
//     all: function() {
//       return chats;
//     },
//     remove: function(chat) {
//       chats.splice(chats.indexOf(chat), 1);
//     },
//     get: function(chatId) {
//       for (var i = 0; i < chats.length; i++) {
//         if (chats[i].id === parseInt(chatId)) {
//           return chats[i];
//         }
//       }
//       return null;
//     }
//   };
// })
.factory('categoryService',function($http,$q,$stateParams){
  var deffered=$q.defer();
  $http.get('http://beta.appystore.in/appy_app/appyApi_handler.php?method=getCategoryList&content_type=videos&limit_start=0&age=1.5&incl_age=5',{headers:{'X_APPY_USERID':'290903782','X_APPY_IMEI': '353368070301951','X_APPY_PCP_ID':' 999','X_APPY_CAMPAIGN_ID': '8700441600','X_APPY_APP_TYPE': 'lite','X_APPY_TTR': '10800000' ,'X_APPY_UTYPE': 'O','X_APPY_MSISDN': '0','X_APPY_IS_NEW_USER': 'N','X_APPY_API_KEY':'gh610rt23eqwpll'}}).then(function(data){
    deffered.resolve(data);
  });
  this.result=function()
  {
    return deffered.promise;
  }
});
