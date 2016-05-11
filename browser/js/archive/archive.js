app.config(function($stateProvider) {
  $stateProvider.state('archive', {
      url: '/archive/:channelId',
      templateUrl: '/js/archive/archive.html',
      // params: { channelId: null },
      controller: 'ArchiveController',
      resolve: {
        getMessages: function(ArchiveFactory) {
          return ArchiveFactory.getAllMessages();
        },
        getChannel: function($http, $stateParams) {
          return 'okay';
          // return $stateParams.channel.name;
          // return $http.get('/channels')
          // .then(function(response){
          //   return response.data
          // })
        }
      }
    })
})

app.controller('ArchiveController', function($rootScope, $scope, $state, $stateParams, getMessages, getChannel) {

  $scope.channel = getChannel

  $scope.messages = [];

  $scope.newest = "date"

  $scope.sortMessages = function(preference) {
    if (preference==="newest") $scope.newest="-date";
    else if (preference=="oldest") $scope.newest="date"
  }

  $scope.logOut = function(channel){
    $state.go('home')
  }

  $scope.messagesGet = function() {
    $scope.messages = getMessages;
  }

})

app.factory('ArchiveFactory', function($http) {

  var cachedMessages = [];
  var ArchiveFactory = {};

  ArchiveFactory.getAllMessages = function() {
    return $http.get('/messages')
    .then(function(response){
      angular.copy(response.data, cachedMessages)
      return cachedMessages;
    })
  }

  return ArchiveFactory;

})