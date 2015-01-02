angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("/templates/home.html","<ion-view title=\"Home\"><ion-content has-header=\"true\" padding=\"true\"><button ui-sref=\"question\" class=\"button button-block button-positive\">Question</button><button ui-sref=\"setting\" class=\"button button-block button-positive\">Setting</button></ion-content></ion-view>");
$templateCache.put("/templates/question.html","<ion-view title=\"Home\"><ion-content has-header=\"true\" padding=\"true\"><button ng-click=\"question.test()\" class=\"button button-block button-positive\">Get question</button></ion-content></ion-view>");
$templateCache.put("/templates/setting.html","<ion-view title=\"Preferenze\"><ion-content has-header=\"false\" padding=\"true\"><list><div class=\"item item-divider\">Generali</div><ion-toggle ng-model=\"setting.examType\" ng-change=\"setting.examTypeChecked()\" toggle-class=\"toggle-calm\" ng-true-value=\"\'oltre\'\" ng-false-value=\"\'entro\'\">Tipo di esame</ion-toggle><div class=\"item item-divider\">Impostazioni domande</div><ion-toggle ng-repeat=\"set in setting.settingList\" ng-change=\"setting.settingListChecked()\" ng-model=\"set.checked\">{{ set.text }}</ion-toggle><div class=\"item item-divider\">Impostazioni domande per sezione</div><label class=\"item item-input item-select\"><div class=\"input-label\">Numero di domande per sezione</div><select ng-model=\"setting.questionNumber\" ng-change=\"setting.questionNumberChecked()\" ng-options=\"option for option in setting.questionPossibility\"><option value=\"\">{{setting.questionNumber}}</option></select></label></list></ion-content></ion-view>");}]);