angular
  .module("app", ['ionic','ngCordova'])

  .run ($ionicPlatform, $cordovaSQLite, DatabaseFactory) ->

    $ionicPlatform.ready ->
      # Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      #  for form inputs)
      if window.cordova && window.cordova.plugins.Keyboard
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)

      if window.StatusBar
        # org.apache.cordova.statusbar required
        StatusBar.styleDefault()
      DatabaseFactory.init()

  .config ($stateProvider, $urlRouterProvider) ->
    $stateProvider
    .state("home",
      url: "/home"
      templateUrl: "templates/home.html"
      controller: 'homeController as home'
      
    )
    .state("setting",
      url: "/setting"
      templateUrl: "templates/setting.html"
      controller: 'settingController as setting'
    )
    .state("question",
      url: "/question"
      templateUrl: "templates/question.html"
      controller: 'questionController as question'
    )

    $urlRouterProvider.otherwise "/home"