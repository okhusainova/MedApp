'use strict';

var medServices = angular.module('medServices', []);



medServices.factory('MEDService', ['$http', '$rootScope', '$location', function($http, $rootScope, $location) {
  return {
    errorHandler : function(type) {

      var service = this;

      switch (type) {
        case 404 :
        case 405 :
        case 0 :
        case 500 :
        case 502 :

          navigator.notification.alert(
              'Please check your network connection and tap refresh',
              function(){window.location.reload();},
              'Network Connection Error',
              'Refresh'
          );

          break;
        case 401 :
          this.logout(true);
          break;
      }
    },

    logout : function(doRedirect) {
      window.localStorage.removeItem("accessToken");
      $rootScope.accessToken = undefined;
     // if (doRedirect) {
        $location.path('/login');
      //}
    },

 dialog: function(open, view) {
      $(".overlay div").css("display", "none");
      if (open) {
        $(".overlay").fadeIn(300);
        $("."+view).css("display", "block");
      } else {
        $(".overlay").fadeOut(300);
        window.scroll(0,0);
      }
    },

    testUser : function(user) {
      return this.request("POST", "auth", {"username" : user.username, "password" : user.password});
    },
    
    request: function(method, endpoint, content, params) {

        var url = $rootScope.server + endpoint;

        var hdrs = {};

        if (!_.isUndefined($rootScope.user.username) && $rootScope.user.username != "") {
         hdrs = {'Authorization' : 'Basic ' + btoa($rootScope.user.username + ":" + $rootScope.user.password)};
        }

        return $http({method: method, url: url, data: content, headers: hdrs, timeout : 20000 });
        
    },

    medications : function(method, data, params, value) {

      var endpoint = "";

      switch (params.action) {
        case "getMedications" :
          endpoint = "medications";
          break;
        case "newMedications" :
          endpoint = "medications";
          break;
        case "deleteMedications" :
        endpoint = "medications/" + value;
        break;

      }
      return this.request(method, endpoint, data);
    },

    prescriptions : function(method, data, params, value) {

      var endpoint = "";

      switch (params.action) {
        case "newPrescriptions" :
          endpoint = "prescriptions";
      }
      return this.request(method, endpoint, data);
    },

    users: function(method, data, params, value) {

      var endpoint = "";

      switch (params.action) {
        case "getUsers" :
          endpoint = "users";
          break;
        case "newUsers" :
          endpoint = "users";
          break;
        case "deleteUsers" :
          endpoint = "users/" + value;
          break;
        case "putUsers" :
          endpoint = "users/" + value;
          break;
        }
        return this.request(method, endpoint, data);
    }
  };
}]);