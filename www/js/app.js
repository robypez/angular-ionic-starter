'use strict';
(function() {
  angular.module("app", ['ionic']).run(function($ionicPlatform) {
    return $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        return StatusBar.styleDefault();
      }
    });
  }).config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state("home", {
      url: "/home",
      templateUrl: "templates/home.html"
    }).state("setting", {
      url: "/setting",
      templateUrl: "templates/setting.html",
      controller: 'settingController as setting'
    }).state("question", {
      url: "/question",
      templateUrl: "templates/question.html",
      controller: 'questionController as question'
    });
    return $urlRouterProvider.otherwise("/home");
  });

}).call(this);

(function() {
  var Home;

  Home = (function() {
    function Home() {
      console.log('home');
    }

    return Home;

  })();

  angular.module('app').controller('homeController', [Home]);

}).call(this);

(function() {
  var Question,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Question = (function() {
    function Question(QuestionService) {
      this.QuestionService = QuestionService;
      this.test = __bind(this.test, this);
      this.questions = [];
      console.log('question controller init');
    }

    Question.prototype.test = function() {
      return this.QuestionService.all().then(function(questions) {
        this.questions = questions;
      });
    };

    return Question;

  })();

  angular.module('app').controller('questionController', ['QuestionService', Question]);

}).call(this);

(function() {
  var QuestionService;

  QuestionService = (function() {
    function QuestionService(DatabaseFactory) {
      this.DatabaseFactory = DatabaseFactory;
    }

    QuestionService.prototype.all = function() {
      console.log('factory question');
      this.DatabaseFactory.query("SELECT * FROM documents").then(function(result) {
        return this.DatabaseFactory.fetchAll(result);
      });
    };

    QuestionService.prototype.getById = function(id) {
      this.DatabaseFactory.query("SELECT * FROM documents WHERE id = ?", [id]).then(function(result) {
        return this.DatabaseFactory.fetch(result);
      });
    };

    return QuestionService;

  })();

  angular.module('app').factory('QuestionService', ['DatabaseFactory', QuestionService]);

}).call(this);

(function() {
  var dataService;

  dataService = (function() {
    function dataService($window) {
      this.$window = $window;
      return {
        set: function(key, value) {
          $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
          return $window.localStorage[key] || defaultValue;
        },
        setObject: function(key, value) {
          $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key) {
          return JSON.parse($window.localStorage[key] || '{}');
        }
      };
    }

    return dataService;

  })();

  angular.module('app').factory('DataService', ['$window', dataService]);

}).call(this);

(function() {
  var DBconfig;

  DBconfig = (function() {
    function DBconfig() {
      return {
        name: 'DB',
        tables: [
          {
            name: 'questions',
            columns: [
              {
                name: 'id',
                type: 'integer primary key'
              }, {
                name: 'title',
                type: 'text'
              }, {
                name: 'keywords',
                type: 'text'
              }, {
                name: 'version',
                type: 'integer'
              }, {
                name: 'release_date',
                type: 'text'
              }, {
                name: 'filename',
                type: 'text'
              }, {
                name: 'context',
                type: 'text'
              }
            ]
          }
        ]
      };
    }

    return DBconfig;

  })();

  angular.module('app').constant('DBCONFIG', DBconfig());

}).call(this);

(function() {
  var DatabaseFactory;

  DatabaseFactory = (function() {
    function DatabaseFactory($q, DBCONFIG) {
      this.$q = $q;
      this.DBCONFIG = DBCONFIG;
    }

    DatabaseFactory.prototype.init = function() {
      this.db = window.openDatabase(this.DBCONFIG.name, "1.0", "database", -1);
      return angular.forEach(this.DBCONFIG.tables, function(table) {
        var columns;
        columns = [];
        angular.forEach(table.columns, function(column) {
          var query;
          columns.push(column.name + " " + column.type);
          return;
          query = "CREATE TABLE IF NOT EXISTS " + table.name + " (" + columns.join(",") + ")";
          this.query(query);
          console.log("Table " + table.name + " initialized");
        });
      });
    };

    DatabaseFactory.prototype.query = function(query, bindings) {
      var deferred;
      bindings = (typeof bindings !== "undefined" ? bindings : []);
      deferred = this.$q.defer();
      this.db.transaction(function(transaction) {
        transaction.executeSql(query, bindings, (function(transaction, result) {
          deferred.resolve(result);
        }), function(transaction, error) {
          deferred.reject(error);
        });
      });
      return deferred.promise;
    };

    DatabaseFactory.prototype.fetchAll = function(result) {
      var i, output;
      output = [];
      i = 0;
      while (i < result.rows.length) {
        output.push(result.rows.item(i));
        i++;
      }
      return output;
    };

    DatabaseFactory.prototype.fetch = function(result) {
      return result.rows.item(0);
    };

    return DatabaseFactory;

  })();

  angular.module('app').factory('DatabaseFactory', ['$q', 'DBCONFIG', DatabaseFactory]);

}).call(this);

(function() {


}).call(this);

(function() {
  var Setting,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Setting = (function() {
    function Setting(DataService, $log) {
      this.DataService = DataService;
      this.questionNumberChecked = __bind(this.questionNumberChecked, this);
      this.settingListChecked = __bind(this.settingListChecked, this);
      this.examTypeChecked = __bind(this.examTypeChecked, this);
      this.examType = this.DataService.getObject('setting_examtype') || {
        checked: false
      };
      this.settingList = this.DataService.getObject('setting_list') || [
        {
          text: 'Dai precedenza a domande sbagliate',
          checked: false
        }, {
          text: 'Dai precedenza a domande mai fatte',
          checked: false
        }, {
          text: 'Mostra subito la soluzione',
          checked: false
        }
      ];
      this.questionPossibility = [10, 20, 30, 40, 50];
      this.questionNumber = this.DataService.get('question_number') || 30;
      return;
    }

    Setting.prototype.examTypeChecked = function() {
      this.DataService.setObject('setting_examtype', this.examType);
    };

    Setting.prototype.settingListChecked = function() {
      this.DataService.setObject('setting_list', this.settingList);
    };

    Setting.prototype.questionNumberChecked = function() {
      this.DataService.set('question_number', this.questionNumber);
    };

    return Setting;

  })();

  angular.module('app').controller('settingController', ['DataService', '$log', Setting]);

}).call(this);
