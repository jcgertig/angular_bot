'use strict';

/**
 * @ngdoc function
 * @name talkToMeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the talkToMeApp
 */
angular.module('talkToMeApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
