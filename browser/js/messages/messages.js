app.config(function($stateProvider) {
  $stateProvider
    .state('messages', {
      url: "/message",
      templateUrl: "/js/messages/message.html"
    })
});