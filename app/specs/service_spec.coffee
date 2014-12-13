'use strict'

describe "The Setting Service", ->

  beforeEach(module('app',['ngStorage']))

  key = "message"
  value = 10

  beforeEach inject ($rootScope, $service) ->
    scope = $rootScope.$new()
    service = $service("SettingService", {$scope: scope})

  it "should save the key value", ->
    service.saveSetting(key,value)
    expect(readSetting(key)).toBe(value) 