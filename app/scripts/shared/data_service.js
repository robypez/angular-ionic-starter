angular.module('app.services')
  .factory('DataService', function($window) {
    var self = this;
    
    self.set = function (key, value) {
      $window.localStorage[key] = value;
    };

    self.get = function (key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    };

    self.setObject = function (key, value) {
      $window.localStorage[key] = JSON.stringify(value);
      return $window.localStorage[key];
    };

    self.getObject = function (key) {
      return JSON.parse($window.localStorage[key] || '{}');
    };

    return self; 
      
  });