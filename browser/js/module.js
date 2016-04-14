'use strict';

var app = angular.module('archivebot', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

})

app.config(function($stateProvider) {
  $stateProvider.state('home', {
      url: '/'
    })
});