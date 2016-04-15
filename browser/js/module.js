'use strict';

var app = angular.module('archivebot', ['ui.router']);

app.config(function($stateProvider, $locationProvider) {

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

})