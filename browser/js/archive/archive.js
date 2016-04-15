app.config(function($stateProvider) {
  $stateProvider.state('archive', {
      url: '/archive',
      templateUrl: 'js/archive/archive.html',
      controller: 'ArchiveController',
      resolve: {
        getMessages: function(ArchiveFactory) {
          return ArchiveFactory.getAllMessages();
        },
        getChannels: function($http) {
          return $http.get('/channels')
          .then(function(response){
            return response.data
          })
        }
      }
    })
})

app.controller('ArchiveController', function($scope, $state, getMessages, getChannels) {

  $scope.messages = [];

  $scope.channels = getChannels;

  $scope.clicked = function(channel){
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