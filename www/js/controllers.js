angular.module('starter.controllers', [])

// .controller('DashCtrl', function($scope) {})
//
// .controller('ChatsCtrl', function($scope, Chats) {
//   // With the new view caching in Ionic, Controllers are only called
//   // when they are recreated or on app start, instead of every page change.
//   // To listen for when this page is active (for example, to refresh data),
//   // listen for the $ionicView.enter event:
//   //
//   //$scope.$on('$ionicView.enter', function(e) {
//   //});
//
//   $scope.chats = Chats.all();
//   $scope.remove = function(chat) {
//     Chats.remove(chat);
//   };
// })

// .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//   $scope.chat = Chats.get($stateParams.chatId);
// })
.controller('categoryCtrl',function($scope,categoryService){
  var array = [];
        $scope.images = [{
            'src': "loading.gif",
            caption: ' loading'
        }];
        $scope.options = {
            clicking: true,
            sourceProp: 'src',
            visible: 11,
            perspective: 35,
            startSlide: 0,
            border: 3,
            dir: 'rtl',
            width: 420,
            height: 260,
            top: 200,
            space: 220,
            autoRotationSpeed: 5000,
            loop: true
        };
        var promise = categoryService.result();
        promise.then(function(data) {
            $scope.images = [];
            var result = data.data.Responsedetails.category_id_array;
            for (i in result) {
                $scope.images.push({
                    'src': result[i].image_path["50x50"],
                    caption: result[i].category_name,
                    cid: result[i].category_id,
                    pid: result[i].parent_category_id
                });
            }
            console.log(result);
        });
    });
