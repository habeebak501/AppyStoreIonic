/**
 *@FileName:controllers.js
 *@CreatedBy:Habeeb
 *@Date:
 *Purpose:Creating Controllers using Ionic Framework
 */
/*Including All Controllers in appystore module*/
angular.module('AppyStore.controllers', [])
  /*Display the CategoryImages using controller*/
  .controller('CategoryCtrl', function($scope, CategoryService, myCache) {
    console.log("CategoryController");
    $scope.loading=true;
    console.log($scope.loading);
    var array = [];
    /*$scope.images = [{
      'src': "loading.gif",
      caption: ' loading'
    }];*/
    /*Carousel view options*/

    $scope.options = {
      clicking: true,
      sourceProp: 'src',
      visible: 11,
      perspective: 35,
      startSlide: 0,
      border: 3,
      dir: 'ltr',
      width: 260,
      height: 180,
      top: 200,
      space: 220,
      // autoRotationSpeed: 5000,
      loop: true
    };
    var cache = myCache.get('CategoryImages');
    console.log(cache);
    if (cache) {
      $scope.images = cache;
      console.log("Cached");
    } else {
      console.log("Not Cached");

      /*Retriving data from CategoryService using promise*/
      var promise = CategoryService.result();
      promise.then(function(data) {
        $scope.loading=false;
        console.log($scope.loading);
        $scope.images = [];
        $scope.res = [];
        var result = data.data.Responsedetails.category_id_array;
        for (i in result) {
          $scope.images.push({
            'src': result[i].image_path["50x50"],
            'caption': result[i].category_name,
            'cid': result[i].category_id,
            'pid': result[i].parent_category_id,
            'content_count': result[i].content_count
          });
        }
        for (i in result) {
          $scope.res.push({
            'content_count': result[i].content_count
          })
        }
        console.log($scope.res);
        console.log($scope.images);
        console.log(result);
      });
    }
    $scope.$watch("images", function(newSlides, oldSlides) {
      // console.log("slidesChanged");
      console.log(newSlides);
      myCache.put("CategoryImages", newSlides);
      $scope.images = myCache.get("CategoryImages");
    });
  })
  /*contentCtrl is used displaying the contentList*/

  .controller("ContentCtrl", function($scope, $stateParams, $http, CategoryService, $ionicHistory, myCache) {
    console.log('ContentController');
    // $ionicLoading.show({
    //   content: 'Loading',
    //   animation: 'fade-in',
    //   showBackdrop: true,
    //   maxWidth: 200,
    //   showDelay: 0
    // });

    var pcatid = $stateParams.pid;
    var catid = $stateParams.cid;
    $scope.content_count = $stateParams.content_count;
    console.log($scope.content_count);
    var count = $scope.content_count;
    $scope.content_count = count;
    $scope.pcatid = pcatid;
    $scope.catid = catid;
    $scope.caption = $stateParams.caption;
    console.log(pcatid, catid);
    var url = $stateParams.url;
    //  var cache=myCache.get('contentImages');
    if ($stateParams.caption) {
      var cache = myCache.get($scope.caption);
    }
    if (cache) {
      $scope.result = cache;
    } else {
      console.log("not cached");
      $scope.loading = true;
     console.log($scope.loading);

      /*contentList url*/
      var url = 'http://beta.appystore.in/appy_app/appyApi_handler.php?method=getContentList&content_type=videos&limit=' + count + '&offset=0&catid=' + catid + '&pcatid=' + pcatid + '&age=1.5&incl_age=5';
      $scope.url = url;
      console.log(url);


      /*Calling restApi for Retriving Data  */
      $http.get(url, {
          headers: {
            'Access-Control-Allow-Origin': 'true',
            'Access-Control-Allow-Methods': 'PUT, GET, POST',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'X_APPY_USERID': '290903782',
            'X_APPY_API_KEY': 'gh610rt23eqwpll',
            'X_APPY_USERID': '290903782',
            'X_APPY_IMEI': '353368070301951',
            'X_APPY_PCP_ID': '999',
            'X_APPY_CAMPAIGN_ID': '8700441600',
            'X_APPY_APP_TYPE': 'lite',
            'X_APPY_TTR': '10800000',
            'X_APPY_UTYPE': 'O',
            'X_APPY_MSISDN': '0',
            'X_APPY_IS_NEW_USER': 'N',
            'X_APPY_UserAgent': 'Mozilla/5.0 (Linux; Android 5.0.2; Panasonic ELUGA Switch Build/LRX22G; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/51.0.2704.81 Mobile Safari/537.36'
          }
        })
        .then(function(response) {
          $scope.loading=false;
           console.log($scope.loading);
          console.log(response);
          $scope.result = response.data.Responsedetails.data_array;
          myCache.put($scope.caption, $scope.result);
          console.log($scope.result);
        })
    }
    $scope.myGoBack = function() {
      console.log("back function called");
      $ionicHistory.goBack();
    };
    $scope.$watch("result", function(newResult, oldResult) {
      console.log("slidesChanged");
      console.log(newResult);
      //  myCache.put($scope.caption, newResult);
      $scope.result = myCache.get($scope.caption);
    });
  })
  /*videoCtrl is used to displaying videos*/
  .controller("VideoCtrl", function($scope, $stateParams, $http, $sce, CategoryService, $ionicHistory) {
    // $scope.load=true;
    console.log('VideoController');
    $scope.content_count = $stateParams.content_count;
    console.log($scope.content_count);
    var count = $scope.content_count;
    // $scope.pagination = Pagination.getNew(count);
    var url = $stateParams.url;
    // var poster = $stateParams.poster;
    var pcatid = $stateParams.pid;
    var catid = $stateParams.cid;
    url = $sce.trustAsResourceUrl(url);
    $scope.url = url;
    console.log("hi");
    console.log(url);

    $scope.myGoBack1 = function() {
      console.log("back function called");
      $ionicHistory.goBack();
    };
    /*changeVideo function is used to change the videos*/
    $scope.changeVideo = function(url) {
        //  console.log(url,poster);
        url = $sce.trustAsResourceUrl(url);
        var video = document.getElementById("myVideo")
        isSupp = video.canPlayType("video/mp4");
        if (isSupp == "") {
          video.src = "mov_bbb.ogg";
        } else {
          video.src = url;
          video.poster = "loading.gif";
        }
      }
      // $scope.poster = poster;
    $scope.pcatid = pcatid;
    $scope.catid = catid;
    console.log(pcatid, catid);

    $scope.loading=true;
     console.log($scope.loading);
    /*contentList url using to retrive videos data*/
    var url = 'http://beta.appystore.in/appy_app/appyApi_handler.php?method=getContentList&content_type=videos&limit=' + count + '&offset=0&catid=' + catid + '&pcatid=' + pcatid + '&age=1.5&incl_age=5';
    $http.get(url, {
        headers: {
          'Access-Control-Allow-Origin': 'true',
          'Access-Control-Allow-Methods': 'PUT, GET, POST',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          'X_APPY_USERID': '290903782',
          'X_APPY_API_KEY': 'gh610rt23eqwpll',
          'X_APPY_USERID': '290903782',
          'X_APPY_IMEI': '353368070301951',
          'X_APPY_PCP_ID': '999',
          'X_APPY_CAMPAIGN_ID': '8700441600',
          'X_APPY_APP_TYPE': 'lite',
          'X_APPY_TTR': '10800000',
          'X_APPY_UTYPE': 'O',
          'X_APPY_MSISDN': '0',
          'X_APPY_IS_NEW_USER': 'N',
          'X_APPY_UserAgent': 'Mozilla/5.0 (Linux; Android 5.0.2; Panasonic ELUGA Switch Build/LRX22G; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/51.0.2704.81 Mobile Safari/537.36'
        }
      })
      .then(function(response) {
        $scope.loading=false;
         console.log($scope.loading);
        $scope.result = response.data.Responsedetails.data_array;
        console.log($scope.result);

      });
  })
  /*SearchCtrl is used to Search the pirticular content images using categoryList*/
  .controller("SearchCtrl", function($window, $scope, SearchService, $stateParams, $ionicHistory, $state) {
    console.log("SearchCtrl");
    $scope.ChangeKeyword = function(name) {
      $scope.result1="";
      if (!name) {
        alert("Please Type Any Text in the SearchBar");
      } else {
        console.log(name);
        $scope.textbox = name;
        $scope.count = $stateParams.total_count;
        console.log($scope.count);
        console.log($scope.textbox);
        $scope.loading=true;
        console.log($scope.loading);
        var url = "http://beta.appystore.in/appy_app/appyApi_handler.php?method=search&keyword=" + name + "&content_type=appsgames&limit=4&offset=0&age=1&incl_age=6";
        console.log(url);
            /*Retriving Data From SearchServices using promisee
         */
        SearchService.getData(url).then(function(data) {
          console.log(data);
          // $scope.result = data.data.Responsedetails[0].data_array;
          $scope.count = data.data.Responsedetails[0].total_count;
          console.log($scope.count);
          var count = $scope.count;
          console.log(count);
          /*Search url for retriving data*/
          var url = "http://beta.appystore.in/appy_app/appyApi_handler.php?method=search&keyword=" + name + "&content_type=appsgames&limit=" + count + "&offset=0&age=1&incl_age=6";
          console.log(url);
          SearchService.getData(url).then(function(data) {

            $scope.loading=false;
            console.log($scope.loading);
            console.log(data);
            $scope.result1 = data.data.Responsedetails[0].data_array;
            console.log($scope.result1);
          })
        })
        if ($scope.textbox) {
          console.log($scope.textbox);
          var textbox = $scope.textbox;
          console.log(textbox);
          $state.go('.SearchImages');
        }
      }; /*myGoBack function is used to go previous page*/
      $scope.myGoBack = function() {
        console.log("fc");
        // $ionicHistory.goBack();
        $window.history.back();
      };
    }
  });
