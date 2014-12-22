class DatabaseFactory extends Factory 
  constructor: ($log, $q, DBCONFIG, CATEGORY_SEED, $http) ->
    db = null
    init = () ->
      db = window.openDatabase DBCONFIG.name, '1.0', 'database', -1
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
        import_data result.data

    category_init = () ->
      angular.forEach CATEGORY_SEED, (category) ->
        import_category category 

    import_category = (category) ->
      q = "INSERT INTO Sections (id, label, image) 
          VALUES (#{category['id']},'#{removeQuotes(category['category'])}','#{category['image']}')"
      query q

    import_data = (data) ->
      $log.info data[0]
      $log.info data[0]['text']
      $log.info data[0]['section']
      $log.info data[0]['image']['image']['url']
      d = data[0]

      q = "INSERT INTO Questions (id, text, exam_type, errors_count, done_count) 
          VALUES (#{d['id']},'#{removeQuotes(d['text'])}','#{d['quiz_type']}',0,0)"
      $log.info q
      query q
      
      # for question in data
      #   $log.info question['text']
      #   $log.info question['section_id']
      #   $log.info question['quiz_type']

    removeQuotes = (str) ->
      str.replace(/'/g, "&#39;").replace(/"/g,"&quot;")

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