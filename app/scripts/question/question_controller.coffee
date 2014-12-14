(->
  Question = (QuestionService) ->
    init = () =>
      @questions = []
      test()
      
    test = () =>
      QuestionService.all().then (questions) -> 
        @questions = questions
        return

    init()
    return

  angular
    .module('app')
    .controller('QuestionCtrl', Question)
)()