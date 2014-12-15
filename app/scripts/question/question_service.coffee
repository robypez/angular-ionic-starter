class QuestionService extends Factory
  constructor: (@Database) ->

  all: () ->
      console.log 'factory question'
      @Database.query("SELECT * FROM documents").then (result) ->
        @Database.fetchAll result
      return

  getById: (id) ->
    @Database.query("SELECT * FROM documents WHERE id = ?", [id]).then (result) ->
      @Database.fetch result
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