'use strict';

var medServices = angular.module('medServices', []);

medServices.factory('MEDService', ['$http', '$rootScope', '$location', function($http, $rootScope, $location) {
  return {
    
    request: function(method, endpoint, content, params) {

        var url = $rootScope.server + endpoint;

        var hdrs = {};

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
          endpoint = "users" + value;
          break;
        }
        return this.request(method, endpoint, data);
    }
  };
}]);

medServices.factory('AuthService', function ($http, Session) {
  var authService = {};
 
  authService.login = function (credentials) {
    return $http
      .post('/login', credentials)
      .then(function (res) {
        Session.create(res.data.id, res.data.user.id,
                       res.data.user.role);
        return res.data.user;
      });
  };
 
  authService.isAuthenticated = function () {
    return !!Session.userId;
  };
 
  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authService.isAuthenticated() &&
      authorizedRoles.indexOf(Session.userRole) !== -1);
  };
 
  return authService;
})

.service('Session', function () {
  this.create = function (sessionId, userId, userRole) {
    this.id = sessionId;
    this.userId = userId;
    this.userRole = userRole;
  };
  this.destroy = function () {
    this.id = null;
    this.userId = null;
    this.userRole = null;
  };
})