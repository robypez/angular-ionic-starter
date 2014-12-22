class Loader extends Config
  constructor: ($httpProvider) ->
    $httpProvider.interceptors.push ($rootScope) ->
      request: (config) ->
        $rootScope.$broadcast "loading:show"
        config

      response: (response) ->
        $rootScope.$broadcast "loading:hide"
        response
    return

class LoaderInterceptor extends Run
  constructor: ($rootScope, $ionicLoading) ->    
    $rootScope.$on "loading:show", ->
      $ionicLoading.show template: "Loading Question"
      return

    $rootScope.$on "loading:hide", ->
      $ionicLoading.hide()
      return

    return 