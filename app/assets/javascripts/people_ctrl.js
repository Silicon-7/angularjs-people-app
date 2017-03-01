(function() {
  "use strict";

  angular.module("app").controller("peopleCtrl", function($scope, $http){
    $scope.setup = function() {
      getPeople();
    };

    function getPeople() {
      $http.get('/api/v1/people.json').then(function(response){
        $scope.people = response.data;
      });
    }

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
      }, function(errors) {
        $scope.errors = errors.data;
      });
    };

    $scope.deletePerson = function(person) {
      var personId = person.id;
      $http.delete(
                  '/api/v1/people/' + personId.toString(), 
                  {headers: {"Accept": "application/json"}}
                  ).then(function(response){
        $scope.people = response.data;
      });
    };

    $scope.toggleOrderAttribute = function(attribute) {
      if (attribute === $scope.orderAttribute){
        $scope.descending = true;
      } else {
        $scope.descending = false;
      }
      $scope.orderAttribute = attribute;
    };

    $scope.arrowForOrder = function(attribute) {
      if (attribute === $scope.orderAttribute) {
        return $scope.descending ? "^" : "v";
      } else {
        return " ";
      }
    };

    window.scope = $scope;
  });

}());







