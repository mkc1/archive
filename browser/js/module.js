'use strict';

var app = angular.module('archivebot', ['ui.router']);

app.config(function($stateProvider) {
  $stateProvider.state('archive', {
      url: '/archive',
      template: 'js/archive/message.html'
    })
});