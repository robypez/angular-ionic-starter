class DatabaseFactory extends Factory 
  constructor: ($log, $q, DBCONFIG, CATEGORY_SEED, $http) ->
    db = null
    init = () ->
      db = window.openDatabase DBCONFIG.name, '1.0', 'Test', -1
      angular.forEach DBCONFIG.tables, (table) ->
        columns = [] 
        angular.forEach table.columns, (column) ->
          columns.push "#{column.name} #{column.type}"
        q = "DROP TABLE #{table.name}"
        query q
        $log.info "Table #{table.name} deleted"
        q = "CREATE TABLE IF NOT EXISTS #{table.name} (#{columns.join(',')})"
        query q
        $log.info "Table #{table.name} initialized"

    query = (query, bindings) ->
      bindings = (if typeof bindings isnt "undefined" then bindings else [])
      deferred = $q.defer()
      db.transaction (transaction) ->
        transaction.executeSql query, bindings, ((transaction, result) ->
          deferred.resolve result
          return
        ), (transaction, error) ->
          deferred.reject error
          $log.error error.message
          return

        return

      deferred.promise

    seed = () ->
      category_init()
      $http.get('data/question.json').then (result) ->
        import_questions result.data

    category_init = () ->
      angular.forEach CATEGORY_SEED, (category) ->
        import_category category 

    import_category = (category) ->
      q = "INSERT INTO Sections (id, label, image) 
          VALUES (#{category['id']},'#{removeQuotes(category['category'])}','#{category['image']}')"
      query q

    import_questions = (data) ->
      for question in data
        import_single_question question
      
     
    import_single_question = (question) ->
      question_section = question['section']['id']
      image = question['image']['image']['url']

      q = "INSERT INTO Questions (id, text, exam_type, errors_count, done_count, section_id, image) 
          VALUES (#{question['id']},'#{removeQuotes(question['text'])}','#{question['quiz_type']}',0,0, #{question_section},'#{fix_image(image)}')"
      # query q

      # for answer in question['answers']
      #   import_single_answer(question['id'], answer)

    import_single_answer = (question_id,answer) ->
      q = "INSERT INTO Answers (id, text, correct, question_id) 
          VALUES (#{answer['id']},'#{removeQuotes(answer['text'])}','#{fix_correct(answer['correct'])}',#{question_id})"
      query q

    removeQuotes = (str) ->
      str.replace(/'/g, "&#39;").replace(/"/g,"&quot;")

    fix_correct = (correct) ->
      if correct == true 
        return 1
      else
        return 0

    fix_image = (image) ->
      return "" if image == '/images/fallback/default.png' 

    fetchAll = (result) ->
      output = []
      i = 0

      while i < result.rows.length
        output.push result.rows.item(i)
        i++
      output

    fetch = (result) ->
      result.rows.item 0

    return { fetch, fetchAll, init, query, seed}