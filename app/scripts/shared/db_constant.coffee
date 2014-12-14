angular.module('app').constant 'DB_CONFIG', [() ->
  new class DB_CONFIG
    constructor: ->
      DB_CONFIG = {
        name: 'DB',
        tables: [
          {
            name: 'questions',
            columns: [
              {name: 'id', type: 'integer primary key'},
              {name: 'title', type: 'text'},
              {name: 'keywords', type: 'text'},
              {name: 'version', type: 'integer'},
              {name: 'release_date', type: 'text'},
              {name: 'filename', type: 'text'},
              {name: 'context', type: 'text'}
            ]
          }
        ]
      }
]