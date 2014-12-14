(->
    Setting = (dataService,$log)->

      init = () =>

        @examType = dataService.getObject('setting_examtype') || { checked: false }
        @settingList = dataService.getObject('setting_list') || [
                        { text: 'Dai precedenza a domande sbagliate', checked: false },
                        { text: 'Dai precedenza a domande mai fatte', checked: false },
                        { text: 'Mostra subito la soluzione', checked: false }
                      ]
        @questionPossibility = [10,20,30,40,50]
        @questionNumber = dataService.get('question_number') ||  30
        
        @examTypeChecked = examTypeChecked
        @settingListChecked = settingListChecked
        @questionNumberChecked = questionNumberChecked
        console.log @examType
        console.log @questionNumber
        console.log @settingList
        
      examTypeChecked = () =>
        dataService.setObject('setting_examtype',@examType)

      settingListChecked = () =>
        dataService.setObject('setting_list',@settingList)

      questionNumberChecked = () =>
        dataService.set('question_number',@questionNumber)

      init()
      return

    angular
      .module('app')
      .controller('SettingCtrl', Setting)
  )()