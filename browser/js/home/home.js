'use strict';

app.config(function($stateProvider) {
  $stateProvider.state('home', {
      url: '/',
      templateUrl: 'js/home/home.html',
      controller: 'HomeCtrl'
    })
})

app.controller('HomeCtrl', function($scope, $state) {

  $scope.showArchive = function() {
    console.log('okay')
    $state.go('archive')
  }
})