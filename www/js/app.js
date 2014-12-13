'use strict';
(function() {
  angular.module("app", ['ionic', 'ionic.utils']).run(function($ionicPlatform) {
    return $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        return StatusBar.styleDefault();
      }
    });
  }).config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state("home", {
      url: "/home",
      templateUrl: "templates/home.html"
    }).state("setting", {
      url: "/setting",
      templateUrl: "templates/setting.html",
      controller: 'SettingCtrl as setting'
    });
    return $urlRouterProvider.otherwise("/home");
  });

}).call(this);

(function() {
  angular.module('ionic.utils', []).factory('$localstorage', [
    '$window', function($window) {
      return {
        set: function(key, value) {
          $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
          return $window.localStorage[key] || defaultValue;
        },
        setObject: function(key, value) {
          $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key) {
          return JSON.parse($window.localStorage[key] || '{}');
        }
      };
    }
  ]);

}).call(this);

(function() {
  (function() {
    var Setting;
    Setting = function($localStorage, $log) {
      var examTypeChecked, init;
      init = (function(_this) {
        return function() {
          _this.examType = {
            checked: false
          };
          _this.settingList = [
            {
              text: 'Dai precedenza a domande sbagliate',
              checked: false
            }, {
              text: 'Dai precedenza a domande mai fatte',
              checked: false
            }, {
              text: 'Mostra subito la soluzione',
              checked: false
            }
          ];
          _this.questionPossibility = [10, 20, 30, 40, 50];
          _this.questionNumber = 30;
          _this.examTypeChecked = examTypeChecked;
          $localstorage.set('name', 'Max');
          return console.log($localstorage.get('name'));
        };
      })(this);
      examTypeChecked = (function(_this) {
        return function() {
          return $log('test');
        };
      })(this);
      init();
    };
    return angular.module('app').controller('SettingCtrl', Setting);
  })();

}).call(this);

(function() {


}).call(this);

(function() {
  angular.module('app').controller('HomeCtrl', function($scope) {
    return $scope.vendors = [
      {
        name: 'AngularJs',
        description: 'for the application framework',
        image: 'angular.png',
        link: 'http://angularjs.org/'
      }, {
        name: 'PhoneGap',
        description: 'for compiling/supporting different devices.',
        image: 'phonegap.png',
        link: 'http://phonegap.com/'
      }, {
        name: 'Ionic',
        description: ' a powerful HTML5 native app development framework.',
        image: 'ionic.png',
        link: 'http://ionicframework.com'
      }
    ];
  });

}).call(this);
