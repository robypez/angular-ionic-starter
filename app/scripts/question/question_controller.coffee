class Question extends Controller
  constructor: (@QuestionService) ->
    @questions = []
    console.log 'pippo'
    

  test: () =>
    @QuestionService.all().then (questions) -> 
      @questions = questions
      return
 
# (->
#   Question = (QuestionService) ->
#     init = () =>
#       @questions = []
#       test()
      
#     test = () =>
#       QuestionService.all().then (questions) -> 
#         @questions = questions
#         return

#     init()
#     return

#   angular
#     .module('app')
#     .controller('QuestionCtrl', Question)
# )()