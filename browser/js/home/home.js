'use strict';

app.config(function($stateProvider) {
  $stateProvider.state('home', {
      url: '/',
      templateUrl: '/js/home/home.html',
      controller: 'HomeCtrl'
    })
})

app.controller('HomeCtrl', function($scope, $state, $http) {

  $scope.errorMessage;

  $scope.login = function(credentials) {
    if (credentials==undefined) return false;
    $http.post('/login', credentials)
    .then(function(response){
      console.log(response.data)
      credentials = undefined;
      if (response.data.error) {
        $scope.errorMessage = "invalid login info"
      }
      else $state.go('archive', {channelId: response.data.channelId})
    })
  }
})