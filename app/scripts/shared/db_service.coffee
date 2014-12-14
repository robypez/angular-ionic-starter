angular.module('app').factory 'DB', ['$q, DB_CONFIG', ($q, DB_CONFIG) ->
  new class DB
    constructor: ->
      # @db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name})
      @db = window.openDatabase(DB_CONFIG.name, "1.0", "database", -1)
      angular.forEach DB_CONFIG.tables, (table) ->
        columns = []
        angular.forEach table.columns, (column) ->
          columns.push column.name + " " + column.type
          return

        query = "CREATE TABLE IF NOT EXISTS " + table.name + " (" + columns.join(",") + ")"
        @query query
        console.log "Table " + table.name + " initialized"
        return

      return

    query: (query, bindings) ->
      bindings = (if typeof bindings isnt "undefined" then bindings else [])
      deferred = $q.defer()
      @db.transaction (transaction) ->
        transaction.executeSql query, bindings, ((transaction, result) ->
          deferred.resolve result
          return
        ), (transaction, error) ->
          deferred.reject error
          return

        return

      deferred.promise

    fetchAll: (result) ->
      output = []
      i = 0

      while i < result.rows.length
        output.push result.rows.item(i)
        i++
      output

    fetch: (result) ->
      result.rows.item 0
]