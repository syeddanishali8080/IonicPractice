/**
 * Created by Syed Danish Ali on 22/03/2016.
 */

angular.module('app.controllers', [])

  .controller('BaseController', function($scope, $rootScope) {
    //console.log("ENTERED BASE CONTROLLER");
    var GLOBAL_VALUES = {ACCESS_TOKEN: '8cce293d7e1eee32c4482cb63b42a4be90364e8aa82bdb66acb76463303bb7d4',
      API_ENDPOINT: 'https://api.dribbble.com/v1/',  //users/:user
      USER_ISLOGIN: false,
      ACCESS_TOKEN_PARAM : function(){return "?access_token=" + this.ACCESS_TOKEN},
      SHOTS: function(){return this.API_ENDPOINT + '/shots'},
      USER : function(){return this.API_ENDPOINT + '/users/'}};


    $rootScope.GLOBAL_VALUES = GLOBAL_VALUES;
  })


  .controller('HomeController', function ($scope, $q, $http, $timeout,$rootScope) {


    $scope.init = function(){
        $scope.getImages()
          .then(function(res){
            //success


              $scope.imageList = res;

            },function(status){
            //failure

            $scope.pageError(status);

          });
    }


    $scope.getImages = function(){
      var defer = $q.defer();

      var url = $rootScope.GLOBAL_VALUES.SHOTS() + '' + $rootScope.GLOBAL_VALUES.ACCESS_TOKEN_PARAM() + '&callback=JSON_CALLBACK';
      console.log("URL:" + url);
      $http.jsonp(url)
        .success(function(res){
          defer.resolve(res.data)
        })
        .error(function(status, error){
          defer.reject(status)
        })


      return defer.promise;
    }

    $scope.init();
  })

.controller('UserController',function($scope,$rootScope, HTTP_CALL,$stateParams,$ionicLoading) {
      $scope.user_id = $stateParams.userId;

  //Make new URL
      var user_url = $rootScope.GLOBAL_VALUES.USER() + $scope.user_id + $rootScope.GLOBAL_VALUES.ACCESS_TOKEN_PARAM();

      //console.log(user_url)

  //CALL SERVICE
    $ionicLoading.show({
      template: 'Please Wait while we fetch the data for you..'
    })
     $scope.userInfo = HTTP_CALL.get(user_url,callbackFunc);




    function callbackFunc(data){
      $scope.userInfo = data

      $ionicLoading.hide();

    }



});



