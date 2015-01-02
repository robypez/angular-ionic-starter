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