angular.module('app.controllers')
  .controller('settingController', function(DataService,$log) {
    this.examType = DataService.getObject('setting_examtype') || { checked: false };
    this.settingList = DataService.getObject('setting_list') || [
                    { text: 'Dai precedenza a domande sbagliate', checked: false },
                    { text: 'Dai precedenza a domande mai fatte', checked: false },
                    { text: 'Mostra subito la soluzione', checked: false }
                  ];
    this.questionPossibility = [10,20,30,40,50];
    this.questionNumber = DataService.get('question_number') ||  30;

    var examTypeChecked = function () {
      DataService.setObject('setting_examtype', this.examType); 
    };

    var questionNumberChecked = function () {
      $log.info('diocane');
      DataService.set('question_number', this.questionNumber);
    };

    var settingListChecked = function () {
      DataService.setObject('setting_list', this.settingList);
    };

  });
