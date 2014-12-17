class DBconfig extends Constant
  constructor: ->
    return {
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