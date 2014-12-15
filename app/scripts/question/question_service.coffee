class QuestionService extends Factory
  constructor: (@DatabaseFactory) ->
    
  all: () ->
    console.log 'factory question'
    @DatabaseFactory.query("SELECT * FROM documents").then (result) ->
      @DatabaseFactory.fetchAll result
    return

  getById: (id) ->
    @DatabaseFactory.query("SELECT * FROM documents WHERE id = ?", [id]).then (result) ->
      @DatabaseFactory.fetch result
    return

# angular.module('app').factory 'QuestionService', ['DB', (DB) ->
#   new class QuestionService
#     constructor: ->

#     all: () ->
#       DB.query("SELECT * FROM documents").then (result) ->
#         DB.fetchAll result
#       return

#     getById: (id) ->
#       DB.query("SELECT * FROM documents WHERE id = ?", [id]).then (result) ->
#         DB.fetch result
#       return
# ]