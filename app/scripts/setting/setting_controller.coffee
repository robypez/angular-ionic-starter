(->
    Setting = ()->

      init = ()=>

        @examType = { checked: false }
        @settingList = [
                        { text: "Dai precedenza a domande sbagliate", checked: false },
                        { text: "Dai precedenza a domande mai fatte", checked: false },
                        { text: "Mostra subito la soluzione", checked: false }
                      ]
        @questionPossibility = [10,20,30,40,50]
        @questionNumber = 30
        @examTypeChecked = examTypeChecked
        
      examTypeChecked = ()=>
        console.log 'pippo'

      init()
      return

    angular
      .module('app')
      .controller('SettingCtrl', Setting)
  )()