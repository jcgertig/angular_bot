'use strict';

/**
 * @ngdoc function
 * @name talkToMeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the talkToMeApp
 */
angular.module('talkToMeApp')
  .controller('MainCtrl', function ($scope, $http, _) {
    $scope.name = 'human';
    $scope.chatMsgs = [];

    $scope.say = function(text) {
      var u = new window.SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(u);
    };

    $scope.chat = function(name, msg) {
      if(!$scope.$$phase) {
        $scope.$apply(function(){
          $scope.chatMsgs.push({name: name, msg: msg});
        });
      } else {
         $scope.chatMsgs.push({name: name, msg: msg});
      }
    };

    $scope.showFlickr = function(term) {
      console.log(term);
      var url = 'https://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&api_key=e7ef915547a3a5fcc4a3a97b3c01e608&per_page=10&text='+term;
      $http({method: 'GET', url: url})
      .success(function(data) {
        data = data.replace(')', '');
        data = JSON.parse(data.replace('jsonFlickrApi(', ''));
        $scope.say('Here are the picturs of ' + term + ' that I could find.');
        $scope.chat('angular bot', 'Here are the picturs of ' + term + ' that I could find.');
        for(var photo in data.photos.photo) {
          photo = data.photos.photo[photo];
          $scope.chat('angular bot', '<img src="https://farm'+photo.farm+'.staticflickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'.jpg"></img>');
        }
      })
      .error(function() {
        console.log('Sorry');
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    };

    $scope.hello = function() {
      $scope.chat($scope.name, 'Hello');

      if ($scope.name !== 'human'){
        $scope.say('What can I do for you ' + $scope.name + '?');
        $scope.chat('angular bot', 'What can I do for you ' + $scope.name + '?');
      } else {
        $scope.say('Hello ' + $scope.name + '.');
        $scope.chat('angular bot', 'Hello ' + $scope.name + '.');
      }
    };

    $scope.myName = function() {
      $scope.chat($scope.name, 'What is your name?');
      $scope.say('You can call me angular bot.');
      $scope.chat('angular bot', 'You can call me angular bot.');
    };

    $scope.userName = function(name) {
      $scope.name = name;
      $scope.chat($scope.name, 'My name is ' + name + '.');
      $scope.say('Okay your name is ' + name + '.');
      $scope.chat('angular bot', 'Okay your name is ' + name + '.');
    };

    $scope.theTime = function() {
      $scope.chat($scope.name, 'What time is it?');
      var d = new Date();
      var text = 'The time is ' + d.toLocaleTimeString();
      $scope.say(text);
      $scope.chat('angular bot', text);
    };

    $scope.thankYou = function() {
      $scope.chat($scope.name, 'Thank you.');
      $scope.say('You are welcome.');
      $scope.chat('angular bot', 'You are welcome.');
    };

    $scope.yes = function() {
      $scope.chat($scope.name, 'No');
      $scope.say('Yes');
      $scope.chat('angular bot', 'Yes');
    };

    $scope.help = function() {
      $scope.say('Here are the available options.');
      $scope.chat('angular bot', 'Here are the available options:');
      var text = '<ul>';
      _.each(_.functions($scope.commands), function(cmd){
        text += '<li>'+cmd+'</li>';
      });
      text += '</ul>';
      $scope.chat('angular bot', text);
    };

    $scope.commands = {
      'hello (angular bot)': $scope.hello,
      'what is your name': $scope.myName,
      'my name is *args': $scope.userName,
      'call me *args': $scope.userName,
      'what time is it (angluar bot)': $scope.theTime,
      'thank you (angluar bot)': $scope.thankYou,
      'no': $scope.yes,
      'show me pictures of *args': $scope.showFlickr,
      'help': $scope.help
    };

    $scope.initApp = function() {
      if (window.annyang) {
        window.annyang.addCommands($scope.commands);
        window.annyang.start();
      }
    };

  });
