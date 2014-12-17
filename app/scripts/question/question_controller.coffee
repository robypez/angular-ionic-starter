class Question extends Controller
  constructor: (@QuestionService) ->
    @questions = []
    console.log 'question controller init'
    

  test: () =>
    @QuestionService.all().then (questions) -> 
      @questions = questions
      return
