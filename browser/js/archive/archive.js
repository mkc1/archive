app.config(function($stateProvider) {
  $stateProvider.state('archive', {
      url: '/archive',
      templateUrl: 'js/archive/archive.html',
      controller: 'ArchiveController'
    })
})

app.controller('ArchiveController', function($scope, $state) {

  $scope.showMessages = function(){
    console.log('okay')
    $state.go('home')
  }
})