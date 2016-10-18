/**
 *@FileName:app.js
 *@CreatedBy:Habeeb
 *@Date:
 *@Purpose:Routing for Ionic Application
 */
/*Include all Dependencies*/
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'angular-carousel-3d', 'ionicImgCache'])
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
      .state('category', {
        url: '/category',
        templateUrl: 'templates/category.html',
        controller: 'categoryCtrl'
      })
      .state('content', {
        url: '/content/?pid?cid?content_count?caption',
        templateUrl: 'templates/content.html',
        controller: 'contentCtrl'
      })
      .state('video', {
        url: '/video/?url?pid?cid?content_count',
        templateUrl: 'templates/video.html',
        controller: 'videoCtrl'
      })
      .state('search',{
        url:'/search',
        templateUrl:'templates/search.html',
        controller:'SearchCtrl'
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/category');
  });
