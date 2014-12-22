class Home extends Controller
  constructor: ($log, DatabaseFactory) ->
    DatabaseFactory.seed()
