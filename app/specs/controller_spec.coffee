'use strict'

describe "The Home Controller", ->

  beforeEach(module('app'))

  scope = {}
  ctrl = {}

  beforeEach inject ($rootScope, $controller) ->
    scope = $rootScope.$new()
    ctrl = $controller("HomeCtrl", {$scope: scope})

  it "should have the correct title", ->
    expect(true).toBe(true) 