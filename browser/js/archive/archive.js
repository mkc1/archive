app.config(function($stateProvider) {
  $stateProvider.state('archive', {
      url: '/archive/:channelId',
      templateUrl: '/js/archive/archive.html',
      // params: { channelId: null },
      controller: 'ArchiveController',
      data: {
        needLogin: true,
      }
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

  console.log($scope.messages)

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

  // $scope.messagesGet = function() {
  //   $scope.messages = getMessages;
  // }

})

// app.factory('ArchiveFactory', function($http) {

//   var cachedMessages = [];
//   var ArchiveFactory = {};

//   ArchiveFactory.getAllMessages = function() {
//     return $http.get('/channels')
//     .then(function(response){
//       angular.copy(response.data, cachedMessages)
//       return cachedMessages;
//     })
//   }

//   return ArchiveFactory;

// })