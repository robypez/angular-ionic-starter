angular.module('app.controllers',['app.services'])
  .controller('homeController', function($log, DatabaseFactory){
    DatabaseFactory.seed();
    }); 