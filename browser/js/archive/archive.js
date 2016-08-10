app.config(function($stateProvider) {
  $stateProvider.state('archive', {
      // url: '/archive/:channelId',
      url: '/archive',
      templateUrl: '/js/archive/archive.html',
      params: { channelId: null },
      controller: 'ArchiveController',
      data: {
        needLogin: true,
      },
      resolve: {
        getChannel: function($http, $stateParams) {
          return $http.get('/channel/'+$stateParams.channelId)
          .then(function(response){
            return response.data
          })
        }
      }
    })
})

app.controller('ArchiveController', function($rootScope, $scope, $state, $stateParams, getChannel, $http) {

  $scope.channel = getChannel.name

  $scope.messages = getChannel.messages;

  $scope.newest = "date"

  $scope.sortMessages = function(preference) {
    if (preference==="newest") $scope.newest="-date";
    else if (preference=="oldest") $scope.newest="date"
  }

  $scope.logOut = function(channel){
    $http.delete('/logout')
    .then(function() {
      $state.go('home')
    })
  }

})