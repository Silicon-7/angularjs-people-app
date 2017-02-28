(function() {
  "use strict";

  angular.module("app").controller("peopleCtrl", function($scope, $http){
    $scope.setup = function() {
      $http.get('/api/v1/people.json').then(function(response){
        $scope.people = response.data;
      });
    };

    $scope.toggleBio = function(person) {
      person.bioVisible = !person.bioVisible;
    };

    $scope.addPerson = function(newName, newBio) {
      var person = {
                    name: newName,
                    bio: newBio
                    };
      $http.post('/api/v1/people.json', person).then(function(response) {
        $scope.people.push(response.data);
        $scope.newPersonName = null;
        $scope.newPersonBio = null;
      });
    };

    $scope.deletePerson = function(person) {
      var index = $scope.people.indexOf(person);
      $scope.people.splice(index,1);
    };

    window.scope = $scope;
  });

}());







