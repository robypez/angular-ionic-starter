class QuestionService extends Factory
  constructor: (DatabaseFactory, $log) ->
    
    all = () ->
      console.log 'factory question'
      DatabaseFactory.query("SELECT * FROM documents").then (result) ->
        DatabaseFactory.fetchAll result
      

    getById = (id) ->
      DatabaseFactory.query("SELECT * FROM documents WHERE id = ?", [id]).then (result) ->
        DatabaseFactory.fetch result
    
    return {all, getById, seed}
