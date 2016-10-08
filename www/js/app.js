// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','angular-carousel-3d'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('category', {
    url: '/category',
  templateUrl: 'templates/category.html',
  controller : 'categoryCtrl'
  })
  .state('content',{
    url:'/content/?pid?cid?content_count',
    templateUrl:'templates/content.html',
    controller:'contentCtrl'
  })
  .state('video',{
    url:'/video/?pid?cid?content_count',
    templateUrl:'tempaltes/video.html',
    controller:'videoCtrl'
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/category');
});
