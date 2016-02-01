'use strict';

var medControllers = angular.module('medControllers', []);

medControllers.controller('add_prescription_Ctrl', ['$scope', 'MEDService', '$location', '$rootScope', function($scope, MEDService, $location, $rootScope) {
 
 MEDService.users("GET", "", {"action" : "getUsers"})
  .success(function(data, status, headers, config) {
    $scope.data1 = data;
  }) 

   MEDService.medications("GET", "", {"action" : "getMedications"})
  .success(function(data, status, headers, config) {
    $scope.data2 = data;
  })

  $scope.newPrescription = {};

  $scope.submitForm = function() {
    MEDService.prescriptions("POST", $scope.newPrescription, {"action": "newPrescriptions"})
    .success(function(data, status, headers, config) {
      $scope.prescriptions = data;
       $scope.newPrescription = {};
      alert('Success!');
    })
    .error(function(data, status, headers, config) {
      //MEDService.errorHandler(status);
    });
  }

  $scope.filterCondition={
        operator: '1'
    }

    $scope.operators = [
        {value: '8.00',  displayName: '8.00' },
        {value: '9.00',  displayName: '9.00' },
        {value: '10.00', displayName: '10.00'},
        {value: '11.00', displayName: '11.00'},
        {value: '12.00', displayName: '12.00'},
        {value: '13.00', displayName: '13.00'},
        {value: '14.00', displayName: '14.00'},
        {value: '15.00', displayName: '15.00'},
        {value: '16.00', displayName: '16.00'},
        {value: '17.00', displayName: '17.00'},
        {value: '18.00', displayName: '18.00'},
        {value: '19.00', displayName: '19.00'},
        {value: '20.00', displayName: '20.00'},
        {value: '21.00', displayName: '21.00'},
        {value: '22.00', displayName: '22.00'}
     ]

}]);


medControllers.controller('medication_list_Ctrl', ['$scope', 'MEDService', '$location', '$rootScope', function($scope, MEDService, $location, $rootScope) {

  MEDService.medications("GET", "", {"action" : "getMedications"})
  .success(function(data, status, headers, config) {
    $scope.medications = data;
  })
  .error(function(data, status, headers, config) {
    //MEDService.errorHandler(status);
  });

    $scope.DeleteMed = function(id) {
       $scope.data = {}
    var _id = id;
    MEDService.medications("DELETE", $scope.data, {"action": "deleteMedications"}, _id)
    .success(function(data, status, headers, config) {
      alert('Success!');
      $scope.medications = _.filter($scope.medications, function(med){ return med._id != id; });
    })
    .error(function(data, status, headers, config) {
      //MEDService.errorHandler(status);
    });
  };
}]);

medControllers.controller('add_medication_Ctrl', ['$scope', 'MEDService', '$location', '$rootScope', function($scope, MEDService, $location, $rootScope) {

  $scope.newMedication = {};

  $scope.submitForm = function() {
    MEDService.medications("POST", $scope.newMedication, {"action": "newMedications"})
    .success(function(data, status, headers, config) {
      $scope.medications = data;
      $scope.newMedication = {};
      alert('Success!');
    })
    .error(function(data, status, headers, config) {
      //MEDService.errorHandler(status);
    });
  };
}]);

medControllers.controller('add_user_Ctrl', ['$scope', 'MEDService', '$location', '$rootScope', function($scope, MEDService, $location, $rootScope) {

  $scope.newUser = {};

  $scope.submitForm = function() {
    MEDService.users("POST", $scope.newUser, {"action": "newUsers"})
    .success(function(data, status, headers, config) {
      $scope.users = data;
      alert('Success!');
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
       $scope.data = {}
    var _id = id;
    MEDService.users("DELETE", $scope.data, {"action": "deleteUsers"}, _id)
    .success(function(data, status, headers, config) {
      alert('Success!');
      $scope.users = _.filter($scope.users, function(us){ return us._id != id; });
    })
    .error(function(data, status, headers, config) {
      //MEDService.errorHandler(status);
    });
  }; 

   $scope.newUser = {
    
              };
  //Update a person
  $scope.updateUser = function (id) {
        var _id = id;
        console.log(_id);
   
   MEDService.users("PUT", $scope.newUser, {"action": "putUsers"}, _id)
  .success(function(data, status, headers, config) {
    $scope.users = data;
    alert('Success!');
})
    .error(function(data, status, headers, config) {
      //MEDService.errorHandler(status);
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

medControllers.controller('add_tracking_Ctrl', ['$scope', 'MEDService', '$location', '$rootScope', function($scope, MEDService, $location, $rootScope) {
    
    }]);

medControllers.controller('loginCtrl', ['$scope', 'MEDService', '$rootScope','$location', function($scope, MEDService, $rootScope, $location) {

  $scope.dateFixer = [];


  $scope.errorMessage = "";

  $scope.tmpImage = "";

  $scope.user = {
    "username" : "",
    "password" : ""
  };


window.localStorage.removeItem("username");
window.localStorage.removeItem("password");

  $scope.login = function() {

      $rootScope.user = {
        "username" : _.isNull(window.localStorage.getItem("username")) ? "" : window.localStorage.getItem("username"),
        "password" : _.isNull(window.localStorage.getItem("password")) ? "" : window.localStorage.getItem("password")
      };

    console.log($rootScope.user);

    if (_.isNull(window.localStorage.getItem("username"))) {
      $rootScope.isLoaded = false;
      MEDService.testUser($scope.user)
      .success(function(data, status, headers, config) {
        console.log(data);
       if (data == "OK") {
        window.localStorage.setItem("username", $scope.user.username);
        window.localStorage.setItem("password", $scope.user.password);
        $rootScope.user = $scope.user;
        $rootScope.isLoaded = true;
        $location.path('/');  
       } else {
       alert('Incorrect! Please check your username and password.');
       }
      });
    }
  };

 }]);

