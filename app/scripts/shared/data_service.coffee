class dataService extends Factory
  constructor: ($window) ->
    set = (key, value) -> 
      $window.localStorage[key] = value;
      return
    get = (key, defaultValue) -> 
      $window.localStorage[key] || defaultValue;
    setObject = (key, value) ->
      $window.localStorage[key] = JSON.stringify(value);
      return
    getObject = (key) ->
      return JSON.parse($window.localStorage[key] || '{}')  
    
    return {set,getObject,get, setObject} 
