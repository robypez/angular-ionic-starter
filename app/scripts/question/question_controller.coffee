class Question extends Controller
  constructor: (@QuestionService) ->
    @questions = []

  test: () =>
    @QuestionService.all().then (questions) -> 
      @questions = questions
      return
