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
      controller: 'SettingCtrl as setting'
    }).state("question", {
      url: "/question",
      templateUrl: "templates/question.html",
      controller: 'QuestionCtrl as question'
    });
    return $urlRouterProvider.otherwise("/home");
  });

}).call(this);

(function() {
  angular.module('app').controller('HomeCtrl', function() {});

}).call(this);

(function() {
  (function() {
    var Question;
    Question = function(QuestionService) {
      var init, test;
      init = (function(_this) {
        return function() {
          _this.questions = [];
          return test();
        };
      })(this);
      test = (function(_this) {
        return function() {
          return QuestionService.all().then(function(questions) {
            this.questions = questions;
          });
        };
      })(this);
      init();
    };
    return angular.module('app').controller('QuestionCtrl', Question);
  })();

}).call(this);

(function() {
  angular.module('app').factory('QuestionService', [
    'DB', function(DB) {
      var QuestionService;
      return new (QuestionService = (function() {
        function QuestionService() {}

        QuestionService.prototype.all = function() {
          DB.query("SELECT * FROM documents").then(function(result) {
            return DB.fetchAll(result);
          });
        };

        QuestionService.prototype.getById = function(id) {
          DB.query("SELECT * FROM documents WHERE id = ?", [id]).then(function(result) {
            return DB.fetch(result);
          });
        };

        return QuestionService;

      })());
    }
  ]);

}).call(this);

(function() {
  (function() {
    var Setting;
    Setting = function(dataService, $log) {
      var examTypeChecked, init, questionNumberChecked, settingListChecked;
      init = (function(_this) {
        return function() {
          _this.examType = dataService.getObject('setting_examtype') || {
            checked: false
          };
          _this.settingList = dataService.getObject('setting_list') || [
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
          _this.questionPossibility = [10, 20, 30, 40, 50];
          _this.questionNumber = dataService.get('question_number') || 30;
          _this.examTypeChecked = examTypeChecked;
          _this.settingListChecked = settingListChecked;
          _this.questionNumberChecked = questionNumberChecked;
          console.log(_this.examType);
          console.log(_this.questionNumber);
          return console.log(_this.settingList);
        };
      })(this);
      examTypeChecked = (function(_this) {
        return function() {
          return dataService.setObject('setting_examtype', _this.examType);
        };
      })(this);
      settingListChecked = (function(_this) {
        return function() {
          return dataService.setObject('setting_list', _this.settingList);
        };
      })(this);
      questionNumberChecked = (function(_this) {
        return function() {
          return dataService.set('question_number', _this.questionNumber);
        };
      })(this);
      init();
    };
    return angular.module('app').controller('SettingCtrl', Setting);
  })();

}).call(this);

(function() {
  angular.module('app').factory('dataService', [
    '$window', function($window) {
      var dataService;
      return new (dataService = (function() {
        function dataService() {}

        dataService.prototype.set = function(key, value) {
          $window.localStorage[key] = value;
        };

        dataService.prototype.get = function(key, defaultValue) {
          return $window.localStorage[key] || defaultValue;
        };

        dataService.prototype.setObject = function(key, value) {
          $window.localStorage[key] = JSON.stringify(value);
        };

        dataService.prototype.getObject = function(key) {
          return JSON.parse($window.localStorage[key] || '{}');
        };

        return dataService;

      })());
    }
  ]);

}).call(this);

(function() {
  angular.module('app').constant('DB_CONFIG', [
    function() {
      var DB_CONFIG;
      return new (DB_CONFIG = (function() {
        function DB_CONFIG() {
          DB_CONFIG = {
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

        return DB_CONFIG;

      })());
    }
  ]);

}).call(this);

(function() {
  angular.module('app').factory('DB', [
    '$q, DB_CONFIG', function($q, DB_CONFIG) {
      var DB;
      return new (DB = (function() {
        function DB() {
          this.db = window.openDatabase(DB_CONFIG.name, "1.0", "database", -1);
          angular.forEach(DB_CONFIG.tables, function(table) {
            var columns, query;
            columns = [];
            angular.forEach(table.columns, function(column) {
              columns.push(column.name + " " + column.type);
            });
            query = "CREATE TABLE IF NOT EXISTS " + table.name + " (" + columns.join(",") + ")";
            this.query(query);
            console.log("Table " + table.name + " initialized");
          });
          return;
        }

        DB.prototype.query = function(query, bindings) {
          var deferred;
          bindings = (typeof bindings !== "undefined" ? bindings : []);
          deferred = $q.defer();
          this.db.transaction(function(transaction) {
            transaction.executeSql(query, bindings, (function(transaction, result) {
              deferred.resolve(result);
            }), function(transaction, error) {
              deferred.reject(error);
            });
          });
          return deferred.promise;
        };

        DB.prototype.fetchAll = function(result) {
          var i, output;
          output = [];
          i = 0;
          while (i < result.rows.length) {
            output.push(result.rows.item(i));
            i++;
          }
          return output;
        };

        DB.prototype.fetch = function(result) {
          return result.rows.item(0);
        };

        return DB;

      })());
    }
  ]);

}).call(this);
