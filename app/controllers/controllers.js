'use strict';

var medControllers = angular.module('medControllers', []);

medControllers.controller('medication_list_Ctrl', ['$scope', 'MEDService', '$location', '$rootScope', function($scope, MEDService, $location, $rootScope) {


  MEDService.medications("GET", "", {"action" : "getMedications"})
  .success(function(data, status, headers, config) {
    $scope.medications = data;
  })
  .error(function(data, status, headers, config) {
    //MEDService.errorHandler(status);
  });

    $scope.DeleteMed = function(id) {
       $scope.data = {
      
    }
    var _id = id;
    MEDService.medications("DELETE", $scope.data, {"action": "deleteMedications"}, _id)
    .success(function(data, status, headers, config) {
    })
    .error(function(data, status, headers, config) {
      //MEDService.errorHandler(status);
    });
  };
}]);

medControllers.controller('add_medication_Ctrl', ['$scope', 'MEDService', '$location', '$rootScope', function($scope, MEDService, $location, $rootScope) {

  $scope.newMedication = {
    
  };

  $scope.submitForm = function() {
    MEDService.medications("POST", $scope.newMedication, {"action": "newMedications"})
    .success(function(data, status, headers, config) {
      $scope.medications = data;
    })
    .error(function(data, status, headers, config) {
      //MEDService.errorHandler(status);
    });
  };
}]);

medControllers.controller('add_user_Ctrl', ['$scope', 'MEDService', '$location', '$rootScope', function($scope, MEDService, $location, $rootScope) {

  $scope.newUser = {
    
  };

  $scope.submitForm = function() {
    MEDService.users("POST", $scope.newUser, {"action": "newUsers"})
    .success(function(data, status, headers, config) {
      $scope.users = data;
    })
    .error(function(data, status, headers, config) {
      //MEDService.errorHandler(status);
    });
  };
}]);

medControllers.controller('patient_list_Ctrl', ['$scope', 'MEDService', '$location', '$rootScope', function($scope, MEDService, $location, $rootScope) {
MEDService.users("GET", "", {"action" : "getUsers"})
  .success(function(data, status, headers, config) {
    $scope.users = data;
  })
  .error(function(data, status, headers, config) {
    //MEDService.errorHandler(status);
  });

  $scope.DeleteUser = function(id) {
       $scope.data = {
      
    }
    var _id = id;
    MEDService.users("DELETE", $scope.data, {"action": "deleteUsers"}, _id)
    .success(function(data, status, headers, config) {
    })
    .error(function(data, status, headers, config) {
      //MEDService.errorHandler(status);
    });
  };

//Edit a person
            $scope.editPerson = function (pId) {
                for (i in $scope.users) {
                    //Getting the person details from scope based on id
                    if ($scope.users[i]._id == pId) {
                        //Assigning the Create user scope variable for editing
                        $scope.newperson = {
                            _id: $scope.users[i]._id,
                            firstname: $scope.users[i].firstname,
                            lastname: $scope.users[i].lastname,
                            username: $scope.users[i].username,
                            password: $scope.users[i].password,
                            role: $scope.users[i].role,
                            description: $scope.users[i].description
                        };
                        //Hiding Save button
                        $scope.DisplaySave = false;
                        //Displaying Update button
                        $scope.DisplayUpdate = true;
                        //Clearing the Status
                        $scope.status = '';
                    }
                }
            };

            //Update a person
            $scope.updatePerson = function () {
                //Defining $http service for updating a person
                $http({
                    method: 'PUT',
                    url: '/api/persons',
                    data: JSON.stringify($scope.newperson),
                    headers: { 'Content-Type': 'application/JSON' }
                }).
                success(function (data) {
                    //Showing Success message
                    $scope.status = "The Person Updated Successfully!!!";
                    //Loading people to the $scope
                    GetPersons();
                    //Displaying save button
                    $scope.DisplaySave = true;
                    //Hiding Update button
                    $scope.DisplayUpdate = false;
                })
                .error(function (error) {
                    //Showing error message
                    $scope.status = 'Unable to update a person: ' + error.message;
                });
            };

      //MEDService.errorHandler(status);

  /* $scope.PutUser = function(id) {
       $scope.data = {
      
    }
    var _id = id;
    MEDService.users("PUT", $scope.data, {"action": "putUsers"}, _id)
    .success(function(data, status, headers, config) {
    })
    .error(function(data, status, headers, config) {
      //MEDService.errorHandler(status);
    });
  };
*/
  }]);

medControllers.controller('LoginCtrl', function($scope, AuthService, $ionicPopup, $state) {
  $scope.user = {
    name: '',
    password: ''
  };
 
  $scope.login = function(user) {
    AuthService.login(user).then(function(user) {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      $scope.setCurrentUser(user);
    }, function() {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      });
  }
});
 /*
medControllers.controller('RegisterCtrl', function($scope, AuthService, $ionicPopup, $state) {
  $scope.user = {
    name: '',
    password: ''
  };
 
  $scope.signup = function() {
    AuthService.register($scope.user).then(function(msg) {
      $state.go('outside.login');
      var alertPopup = $ionicPopup.alert({
        title: 'Register success!',
        template: msg
      });
    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Register failed!',
        template: errMsg
      });
    });
  };
})
 
medControllers.controller('InsideCtrl', function($scope, AuthService, API_ENDPOINT, $http, $state) {
  $scope.destroySession = function() {
    AuthService.logout();
  };
 
  $scope.getInfo = function() {
    $http.get(API_ENDPOINT.url + '/memberinfo').then(function(result) {
      $scope.memberinfo = result.data.msg;
    });
  };
 
  $scope.logout = function() {
    AuthService.logout();
    $state.go('outside.login');
  };
})
 
medControllers.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('outside.login');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });
  });
}); */

medControllers.controller('add_tracking_Ctrl', ['$scope', 'MEDService', '$location', '$rootScope', function($scope, MEDService, $location, $rootScope) {
    }]);