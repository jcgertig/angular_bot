'use strict';

/**
 * @ngdoc overview
 * @name talkToMeApp
 * @description
 * # talkToMeApp
 *
 * Main module of the application.
 */
angular
  .module('talkToMeApp', [
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'LocalStorageModule',
    'underscore',
    'mgcrea.jquery',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

      // .when('/about', {
      //   templateUrl: 'views/about.html',
      //   controller: 'AboutCtrl'
      // })
  });
