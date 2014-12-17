class DatabaseFactory extends Factory 
  constructor: ($log, $q, DBCONFIG) ->
    db = null
    init = () ->
      db = window.openDatabase DBCONFIG.name, '1.0', 'database', -1
      angular.forEach DBCONFIG.tables, (table) ->
        columns = [] 

        angular.forEach table.columns, (column) ->
            columns.push "#{column.name} #{column.type}"

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
          return

        return

      deferred.promise

    fetchAll = (result) ->
      output = []
      i = 0

      while i < result.rows.length
        output.push result.rows.item(i)
        i++
      output

    fetch = (result) ->
      result.rows.item 0

    return { fetch, fetchAll, init, query}