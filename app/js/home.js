'use strict';

angular.module('myApp.home', ['ngRoute','ngMaterial'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', function($scope) {
  
});