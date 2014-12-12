App = angular.module("app", ['ionic'])

App.run ($ionicPlatform) ->

  $ionicPlatform.ready ->
    # Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    #  for form inputs)
    if window.cordova && window.cordova.plugins.Keyboard
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)

    if window.StatusBar
      # org.apache.cordova.statusbar required
      StatusBar.styleDefault()


App.config ($stateProvider, $urlRouterProvider) ->
  $stateProvider
  .state("home",
    url: "/home"
    templateUrl: "templates/home.html"
  )

  $urlRouterProvider.otherwise "/home"