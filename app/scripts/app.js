angular
  .module('app', ['ionic','ngCordova','app.services', 'app.controllers', 'app.shared'])

  .run(function($ionicPlatform, $cordovaSQLite, DatabaseFactory) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
        
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
      DatabaseFactory.init();
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html',
      controller: 'homeController as home'
    })
      
    .state('setting', {
      url: '/setting',
      templateUrl: 'templates/setting.html',
      controller: 'settingController as setting'
    })
    .state('question', {
      url: '/question',
      templateUrl: 'templates/question.html',
      controller: 'questionController as question'
    });
    
    $urlRouterProvider.otherwise('/home');
  }); 