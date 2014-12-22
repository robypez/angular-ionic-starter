'use strict';
(function() {
  angular.module("app", ['ionic']).run(function($ionicPlatform, DatabaseFactory) {
    return $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
      return DatabaseFactory.init();
    });
  }).config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state("home", {
      url: "/home",
      templateUrl: "templates/home.html",
      controller: 'homeController as home'
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
    function Home($log, DatabaseFactory) {
      DatabaseFactory.seed();
    }

    return Home;

  })();

  angular.module('app').controller('homeController', ['$log', 'DatabaseFactory', Home]);

}).call(this);

(function() {
  var Question,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Question = (function() {
    function Question(QuestionService) {
      this.QuestionService = QuestionService;
      this.test = __bind(this.test, this);
      this.questions = [];
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
    function QuestionService(DatabaseFactory, $log) {
      var all, getById;
      all = function() {
        console.log('factory question');
        return DatabaseFactory.query("SELECT * FROM documents").then(function(result) {
          return DatabaseFactory.fetchAll(result);
        });
      };
      getById = function(id) {
        return DatabaseFactory.query("SELECT * FROM documents WHERE id = ?", [id]).then(function(result) {
          return DatabaseFactory.fetch(result);
        });
      };
      return {
        all: all,
        getById: getById,
        seed: seed
      };
    }

    return QuestionService;

  })();

  angular.module('app').factory('QuestionService', ['DatabaseFactory', '$log', QuestionService]);

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

(function() {
  var CategorySeed;

  CategorySeed = (function() {
    function CategorySeed() {
      return [
        {
          id: 1,
          category: "XXXXXX",
          image: "sadasdasd"
        }, {
          id: 2,
          category: "XXXXXX",
          image: "sadasdasd"
        }, {
          id: 3,
          category: "XXXXXX",
          image: "sadasdasd"
        }, {
          id: 4,
          category: "XXXXXX",
          image: "sadasdasd"
        }, {
          id: 5,
          category: "XXXXXX",
          image: "sadasdasd"
        }, {
          id: 6,
          category: "XXXXXX",
          image: "sadasdasd"
        }
      ];
    }

    return CategorySeed;

  })();

  angular.module('app').constant('CATEGORY_SEED', CategorySeed());

}).call(this);

(function() {
  var dataService;

  dataService = (function() {
    function dataService($window) {
      var get, getObject, set, setObject;
      set = function(key, value) {
        $window.localStorage[key] = value;
      };
      get = function(key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      };
      setObject = function(key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      };
      getObject = function(key) {
        return JSON.parse($window.localStorage[key] || '{}');
      };
      return {
        set: set,
        getObject: getObject,
        get: get,
        setObject: setObject
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
        name: 'nautica',
        tables: [
          {
            name: 'Questions',
            columns: [
              {
                name: 'id',
                type: 'INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL'
              }, {
                name: 'text',
                type: 'TEXT'
              }, {
                name: 'exam_type',
                type: 'TEXT'
              }, {
                name: 'section_id',
                type: 'REFERENCES Sections(id)'
              }, {
                name: 'errors_count',
                type: 'INTEGER'
              }, {
                name: 'done_count',
                type: 'INTEGER'
              }, {
                name: 'image',
                type: 'TEXT'
              }
            ]
          }, {
            name: 'Answers',
            columns: [
              {
                name: 'id',
                type: 'INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL'
              }, {
                name: 'text',
                type: 'TEXT'
              }, {
                name: 'correct',
                type: 'INTEGER'
              }, {
                name: 'question_id',
                type: 'REFERENCES Questions(id)'
              }
            ]
          }, {
            name: 'Sections',
            columns: [
              {
                name: 'id',
                type: 'INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL'
              }, {
                name: 'label',
                type: 'TEXT'
              }, {
                name: 'image',
                type: 'TEXT'
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
    function DatabaseFactory($log, $q, DBCONFIG, CATEGORY_SEED, $http) {
      var category_init, db, fetch, fetchAll, import_category, import_data, init, query, removeQuotes, seed;
      db = null;
      init = function() {
        db = window.openDatabase(DBCONFIG.name, '1.0', 'database', -1);
        return angular.forEach(DBCONFIG.tables, function(table) {
          var columns, q;
          columns = [];
          angular.forEach(table.columns, function(column) {
            return columns.push("" + column.name + " " + column.type);
          });
          q = "DROP TABLE " + table.name;
          query(q);
          $log.info("Table " + table.name + " deleted");
          q = "CREATE TABLE IF NOT EXISTS " + table.name + " (" + (columns.join(',')) + ")";
          query(q);
          return $log.info("Table " + table.name + " initialized");
        });
      };
      query = function(query, bindings) {
        var deferred;
        bindings = (typeof bindings !== "undefined" ? bindings : []);
        deferred = $q.defer();
        db.transaction(function(transaction) {
          transaction.executeSql(query, bindings, (function(transaction, result) {
            deferred.resolve(result);
          }), function(transaction, error) {
            deferred.reject(error);
            $log.error(error.message);
          });
        });
        return deferred.promise;
      };
      seed = function() {
        category_init();
        return $http.get('data/question.json').then(function(result) {
          return import_data(result.data);
        });
      };
      category_init = function() {
        return angular.forEach(CATEGORY_SEED, function(category) {
          return import_category(category);
        });
      };
      import_category = function(category) {
        var q;
        q = "INSERT INTO Sections (id, label, image) VALUES (" + category['id'] + ",'" + (removeQuotes(category['category'])) + "','" + category['image'] + "')";
        return query(q);
      };
      import_data = function(data) {
        var d, q;
        $log.info(data[0]);
        $log.info(data[0]['text']);
        $log.info(data[0]['section']);
        $log.info(data[0]['image']['image']['url']);
        d = data[0];
        q = "INSERT INTO Questions (id, text, exam_type, errors_count, done_count) VALUES (" + d['id'] + ",'" + (removeQuotes(d['text'])) + "','" + d['quiz_type'] + "',0,0)";
        $log.info(q);
        return query(q);
      };
      removeQuotes = function(str) {
        return str.replace(/'/g, "&#39;").replace(/"/g, "&quot;");
      };
      fetchAll = function(result) {
        var i, output;
        output = [];
        i = 0;
        while (i < result.rows.length) {
          output.push(result.rows.item(i));
          i++;
        }
        return output;
      };
      fetch = function(result) {
        return result.rows.item(0);
      };
      return {
        fetch: fetch,
        fetchAll: fetchAll,
        init: init,
        query: query,
        seed: seed
      };
    }

    return DatabaseFactory;

  })();

  angular.module('app').factory('DatabaseFactory', ['$log', '$q', 'DBCONFIG', 'CATEGORY_SEED', '$http', DatabaseFactory]);

}).call(this);

(function() {
  var Loader, LoaderInterceptor;

  Loader = (function() {
    function Loader($httpProvider) {
      $httpProvider.interceptors.push(function($rootScope) {
        return {
          request: function(config) {
            $rootScope.$broadcast("loading:show");
            return config;
          },
          response: function(response) {
            $rootScope.$broadcast("loading:hide");
            return response;
          }
        };
      });
      return;
    }

    return Loader;

  })();

  LoaderInterceptor = (function() {
    function LoaderInterceptor($rootScope, $ionicLoading) {
      $rootScope.$on("loading:show", function() {
        $ionicLoading.show({
          template: "Loading Question"
        });
      });
      $rootScope.$on("loading:hide", function() {
        $ionicLoading.hide();
      });
      return;
    }

    return LoaderInterceptor;

  })();

  angular.module('app').config(['$httpProvider', Loader]).run(['$rootScope', '$ionicLoading', LoaderInterceptor]);

}).call(this);
