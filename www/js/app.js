'use strict';
angular
  .module('app', ['ionic','ngCordova','app.services', 'app.controllers', 'app.shared'])

  .run(function($ionicPlatform, $cordovaSQLite, DatabaseFactory) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
        
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
      DatabaseFactory.init();
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html',
      controller: 'homeController as home'
    })
      
    .state('setting', {
      url: '/setting',
      templateUrl: 'templates/setting.html',
      controller: 'settingController as setting'
    })
    .state('question', {
      url: '/question',
      templateUrl: 'templates/question.html',
      controller: 'questionController as question'
    });
    
    $urlRouterProvider.otherwise('/home');
  }); 
angular.module('app.controllers',['app.services'])
  .controller('homeController', function($log, DatabaseFactory){
    DatabaseFactory.seed();
    }); 
angular.module('app.dbconfig',[])
  .constant('DB_CONFIG', {
      name: 'nautica',
      tables: [
        {
          name: 'Questions',
          columns: [
            {name: 'id', type: 'INTEGER PRIMARY KEY NOT NULL'},
            {name: 'text', type: 'TEXT'},
            {name: 'exam_type', type: 'TEXT'},
            {name: 'section_id', type: 'REFERENCES Sections(id)'},
            {name: 'errors_count', type: 'INTEGER'},
            {name: 'done_count', type: 'INTEGER'},
            {name: 'image', type: 'TEXT'}
          ]
        },
        {
          name: 'Answers',
          columns: [
            {name: 'id', type: 'INTEGER PRIMARY KEY NOT NULL'},
            {name: 'text', type: 'TEXT'},
            {name: 'correct', type: 'INTEGER'},
            {name: 'question_id', type: 'REFERENCES Questions(id)'}  
          ]
        },
        {
          name: 'Sections',
          columns: [
            {name: 'id', type: 'INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL'},
            {name: 'label', type: 'TEXT'},
            {name: 'image', type: 'TEXT'},

          ]
        } 
      ]
    })
  .constant('CATEGORY_CONFIG', [
      {id: 1, category: 'XXXXXX', image: 'sadasdasd'},
      {id: 2, category: 'XXXXXX', image: 'sadasdasd'},
      {id: 3, category: 'XXXXXX', image: 'sadasdasd'},
      {id: 4, category: 'XXXXXX', image: 'sadasdasd'},
      {id: 5, category: 'XXXXXX', image: 'sadasdasd'},
      {id: 6, category: 'XXXXXX', image: 'sadasdasd'},
    ]
  );

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

angular.module('app.services',['app.dbconfig']);
angular.module('app.services')
  .factory('DataService', function($window) {
    var self = this;
    
    self.set = function (key, value) {
      $window.localStorage[key] = value;
    };

    self.get = function (key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    };

    self.setObject = function (key, value) {
      $window.localStorage[key] = JSON.stringify(value);
      return $window.localStorage[key];
    };

    self.getObject = function (key) {
      return JSON.parse($window.localStorage[key] || '{}');
    };

    return self; 
      
  });
angular.module('app.services')

.factory('DatabaseFactory', function($log, $q, DB_CONFIG, CATEGORY_CONFIG, $http) {
  var self = this;
  self.db = null;

  self.init = function() {
    self.db = window.openDatabase (DB_CONFIG.name, '1.0', 'database', -1);
    angular.forEach(DB_CONFIG.tables, function(table) {
        var columns = [];
        angular.forEach(table.columns, function(column) {
            columns.push(column.name + ' ' + column.type);
          });
        var query = 'DROP TABLE' + table.name;
        $log.info('Table' + table.name + 'deleted');
        self.query(query);
        query = 'CREATE TABLE IF NOT EXISTS' + table.name + '(' + columns.join(',') + ')';
        self.query(query);
        $log.info('Table' + table.name + 'initialized');
      });
    categoryInit();
    $log.info('Category initialized');
  };

  self.query = function(query, bindings) {
    bindings = typeof bindings !== 'undefined' ? bindings : [];
    var deferred = $q.defer();

    self.db.transaction(function(transaction) {
      transaction.executeSql(query, bindings, function(transaction, result) {
          deferred.resolve(result);
      }, function(transaction, error) {
          deferred.reject(error);
      });
    });

    return deferred.promise;
  };

  var categoryInit = function() {
    angular.forEach(CATEGORY_CONFIG, function(category) {
      importCategory(category);
      });
    };

  self.seed = function() {
    $http.get('data/question.json').then(function(result){
      importQuestion(result.data);
      });
    };

  var importCategory = function(category){
    var query = 'INSERT INTO Sections (id, label, image) VALUES (' + category.id + ',' + removeQuotes(category.category) + ',' + category.image + ')';
    self.query(query);
    };

  var importQuestion = function(data) {

    };

  var importSingleQuestion = function(question) {
    $log.info('importing question...');
    var questionSection = question.section.id;
    var image = question.image.image.url;
    var query = 'INSERT INTO Questions (id, text, exam_type, errors_count, done_count, section_id, image) VALUES (' +
      question.id + ',' + removeQuotes(question.text) + ',' + question.quiz_type + ',0,0,' + questionSection + ',' + fixImage(image) + ')';
    self.query(query); 
    };


  var importSingleAnswer = function(questionID, answer) {
    var query = 'INSERT INTO Answers (id, text, correct, questionID) VALUES (' + answer.id + ',' + removeQuotes(answer.text) + ',' + fixCorrect(answer.correct) + ',' + questionID +')';
    self.query(query);
    };

  var removeQuotes = function(string){
    string.replace(/'/g, '&#39;').replace(/"/g,'&quot;');
  };

  var fixCorrect = function(correct){
    if(correct === true) {
      correct = 1;
    } else {
      correct = 0;
    }
    return correct;
  };

  var fixImage = function(image) {
    var annulla = '';
    if (image === '/images/fallback/default.png') {
      return annulla;
    } else {
      return image;
    }
  };

  return self;

});
angular.module('app.shared', ['ionic'])

.config(function($httpProvider) {
  $httpProvider.interceptors.push(function($rootScope) {
    return {
      request: function(config) {
        $rootScope.$broadcast('loading:show');
        return config;
      },
      response: function(response) {
        $rootScope.$broadcast('loading:hide');
        return response;
      }
    };
  });
})

.run(function($rootScope, $ionicLoading) {
  $rootScope.$on('loading:show', function() {
    $ionicLoading.show({template: 'foo'});
  });

  $rootScope.$on('loading:hide', function() {
    $ionicLoading.hide();
  });
});
