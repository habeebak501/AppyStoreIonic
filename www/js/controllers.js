angular.module('starter.controllers', [])
.controller('categoryCtrl',function($scope,CategoryService){
  console.log("categorycontroller");
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
            width: 260,
            height: 180,
            top: 200,
            space: 220,
            autoRotationSpeed: 10000,
            loop: true
        };
        var promise = CategoryService.result();
        promise.then(function(data) {
            $scope.images = [];
            $scope.res=[];
            var result = data.data.Responsedetails.category_id_array;
            for (i in result) {
                $scope.images.push({
                    'src': result[i].image_path["50x50"],
                    'caption': result[i].category_name,
                    'cid': result[i].category_id,
                  'pid': result[i].parent_category_id,
                    'content_count':result[i].content_count
                });
            }
            for(i in result){
              $scope.res.push({
                'content_count':result[i].content_count
              })
            }
            console.log($scope.res);
            console.log($scope.images);
            console.log(result);
        });
    })
    .controller("contentCtrl", function($scope, $stateParams, $http,CategoryService) {
        //  $scope.load=true;
        console.log('contentController');
        //  $scope.pagination = Pagination.getNew(3);
        var pcatid = $stateParams.pid;
        var catid = $stateParams.cid;
        $scope.content_count = $stateParams.content_count;
        console.log($scope.content_count);
        var count = $scope.content_count;
        $scope.content_count=count;
        $scope.pcatid = pcatid;
        $scope.catid = catid;
        console.log(pcatid, catid);
        var url = $stateParams.url;
        var url = 'http://beta.appystore.in/appy_app/appyApi_handler.php?method=getContentList&content_type=videos&limit='+count+'&offset=0&catid=' + catid + '&pcatid=' + pcatid + '&age=1.5&incl_age=5';
        $scope.url = url;
        console.log(url);
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
                // $scope.load=false;
                $scope.result = response.data.Responsedetails.data_array;
                console.log($scope.result);
                //  $scope.pagination.numPages = Math.ceil($scope.result.length / $scope.pagination.perPage);
            });
    })
    .controller("videoCtrl", function($scope, $stateParams, $http, $sce, Pagination,categoryService) {
        // $scope.load=true;
        console.log('videoController');
        $scope.content_count = $stateParams.content_count;
        console.log($scope.content_count);
        var count = $scope.content_count;
        $scope.pagination = Pagination.getNew(count);
        var url = $stateParams.url;
        // var poster = $stateParams.poster;
        var pcatid = $stateParams.pid;
        var catid = $stateParams.cid;
        url = $sce.trustAsResourceUrl(url);
        $scope.url = url;
        console.log("hi");
        console.log(url);
        $scope.changeVideo = function(url) {
        //  console.log(url,poster);
            url = $sce.trustAsResourceUrl(url);
            var video = document.getElementById("myVideo")
            isSupp = video.canPlayType("video/mp4");
            if (isSupp == "") {
                video.src = "video4.ogg";
            } else {
                video.src = url;
                 video.poster ="loading.gif";
            }
        }
        // $scope.poster = poster;
        $scope.pcatid = pcatid;
        $scope.catid = catid;
        console.log(pcatid, catid);
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
                // $scope.load=false;
                // console.log("reponse",response);
                //          $scope.arr=[];
                //   var result = response.data.Responsedetails.data_arrays;
                //        for(i in result){
                //      $scope.arr.push(result[i].dnld_url);
                // }
                //       console.log($scope.arr);
                $scope.result = response.data.Responsedetails.data_array;
                $scope.pagination.numPages = Math.ceil($scope.result.length / $scope.pagination.perPage);
                console.log($scope.result);

            });
    });
