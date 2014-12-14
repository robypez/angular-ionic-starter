angular.module('app').factory 'QuestionService', ['DB', (DB) ->
  new class QuestionService
    constructor: ->
      
    all: () ->
      DB.query("SELECT * FROM documents").then (result) ->
        DB.fetchAll result
      return

    getById: (id) ->
      DB.query("SELECT * FROM documents WHERE id = ?", [id]).then (result) ->
        DB.fetch result
      return
]