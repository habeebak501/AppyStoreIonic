/**
 *@FileName:app.js
 *@CreatedBy:Habeeb
 *@Date:
 *@Purpose:Routing for Ionic Application
 */
/*Include all Dependencies*/
angular.module('AppyStore', ['ionic', 'AppyStore.controllers', 'AppyStore.services', 'angular-carousel-3d', 'ionicImgCache'])
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
  /*config method is used to routing different states*/
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('Category', {
        url: '/Category',
        templateUrl: 'templates/Category.html',
        controller: 'CategoryCtrl'
      })
      .state('Content', {
        url: '/Content/?pid?cid?content_count?caption',
        templateUrl: 'templates/Content.html',
        controller: 'ContentCtrl'
      })
      .state('Video', {
        url: '/Video/?url?pid?cid?content_count',
        templateUrl: 'templates/Video.html',
        controller: 'VideoCtrl'
      })
      .state('Search',{
        url:'/Search',
        templateUrl:'templates/Search.html',
        controller:'SearchCtrl'
      })
      .state('Search.SearchImages',{
        url:'/SearchImages',
        templateUrl:'templates/SearchImages.html',
         controller:'SearchCtrl'
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/Category');
  });
