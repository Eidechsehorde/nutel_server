var app = angular.module('serverApp',[require('angular-route')]);

app.controller('testeCtrl', function(){
  $scope.firstName = "Augusto";
  $scope.lastName = "Amor";
});
