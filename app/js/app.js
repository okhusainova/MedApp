'use strict';
// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'ngMaterial',
  'medServices',
  'medControllers',
  'xeditable'
]);


myApp.config(['$routeProvider', '$httpProvider', '$locationProvider',
  function($routeProvider, $httpProvider, $locationProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});



$routeProvider.
      when('/medication_list', {
        templateUrl: 'templates/medication_list.html',
        controller: 'medication_list_Ctrl'
      }).
      when('/patient_list', {
        templateUrl: 'templates/patient_list.html',
        controller: 'patient_list_Ctrl'
      }).
      when('/add_medication', {
        templateUrl: 'templates/add_medication.html',
        controller: 'add_medication_Ctrl'
      }).
      when('/add_prescription', {
        templateUrl: 'templates/add_prescription.html',
        controller: 'add_prescription_Ctrl'
      }).
      when('/add_user', {
        templateUrl: 'templates/add_user.html',
        controller: 'add_user_Ctrl'
      }).
      when('/add_tracking', {
        templateUrl: 'templates/add_tracking.html',
        controller: 'add_tracking_Ctrl'
      }).
      when('/login', {
         abstract: true,
         templateUrl: 'templates/login.html',
         controller: 'LoginCtrl'
      }).
       when('/register', {
         abstract: true,
         templateUrl: 'templates/register.html',
         controller: 'RegisterCtrl'
      }).
      when('/inside', {
         abstract: true,
         templateUrl: 'templates/inside.html',
         controller: 'InsideCtrl'
      }).
      otherwise({
        redirectTo: '/',
      });

      $httpProvider.defaults.headers.patch = {
        'Content-Type': 'application/json;charset=utf-8'
      };
}])

.controller('MainCtrl', function($scope, $timeout, $mdSidenav) {
  $scope.toggleRight = function() {
    $mdSidenav('left').toggle();
  };

  $scope.menu = {};
  $scope.menu.pages = [
    {"url": "/medication_list", "discription" : "Medication's List"},
    {"url": "/patient_list", "discription" : "Patient's List"},
    {"url": "/add_medication", "discription" : "Add a medication"},
    {"url": "/add_prescription", "discription" : "Add a prescription"},
    {"url": "/add_user", "discription" : "Add a patient"},
    {"url": "/add_tracking", "discription" : "Add a tracking"} 
  ];

  $scope.menu.isPageSelected = function(page) {
    return ($scope.menu.currentPage === page);
  };

  $scope.menu.toggleSelectPage = function(page) {
    $scope.menu.currentPage = page;
  };




})

.controller('LeftCtrl', function($scope, $timeout, $mdSidenav) {
  $scope.close = function() {
    $mdSidenav('left').close();
  };
});


myApp.run(['$http', '$rootScope', 'MEDService', '$location', 'editableOptions', function($http, $rootScope, MEDService, $location, editableOptions){
  
  $rootScope.server = "http://localhost:8080/api/";

  $rootScope.appName = "MedApp";

  $location.path('/welcome');
   editableOptions.theme = 'bs3';

}]);