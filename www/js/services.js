/**
 * Created by Syed Danish Ali on 22/03/2016.
 */


angular.module('app.services', [])

  .factory('HTTP_CALL', function ($http, $q, $timeout) {

    var data = null;

    return {
      get: function (url,callback) {
        fetchResponse(url,callback);
      }
    }

   function fetchResponse(url,callback) {

     url = url + "&callback=JSON_CALLBACK"
      var defer = $q.defer();

      $http.jsonp(url)
        .success(function (res) {
          defer.resolve(res);
        })
        .error(function (status, err) {
          defer.reject(status);
        })

      defer.promise
        .then(function (res) {
        //on Success
          this.data = res.data;
          callback(res.data);
        }, function (status) {
        //on failure
          this.data = null;
        });


    }
  });
