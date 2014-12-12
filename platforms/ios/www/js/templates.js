angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("/templates/about.html","<ion-view title=\"About this seed\"><ion-content has-header=\"true\" has-tabs=\"true\" padding=\"true\"><div class=\"card\"><p>This is a sample seed project created by Luis Edimerchk Laverde.</p><p>You can find me in:</p><div class=\"list\"><a href=\"mailto:edyhack@gmail.com\" target=\"_blank\" class=\"item item-icon-left\"><i class=\"icon ion-email\"></i>edyhack@gmail.com</a><a href=\"https://twitter.com/edymerchk\" target=\"_blank\" class=\"item item-icon-left\"><i class=\"icon ion-social-twitter\"></i>@edymerchk</a><a href=\"https://github.com/edymerchk\" target=\"_blank\" class=\"item item-icon-left\"><i class=\"icon ion-social-github\"></i>github.com/edymerchk</a></div></div></ion-content></ion-view>");
$templateCache.put("/templates/home.html","<ion-view title=\"Home\"><ion-content has-header=\"true\" has-tabs=\"true\"><div class=\"card\"><div class=\"item item-text-wrap\"><h2>ionic-gulp-seed</h2></div></div><div class=\"card\"><div class=\"item item-text-wrap\">This is a seed template for building mobile apps using like HTML, CSS, and Javascript.</div></div><div class=\"card\"><div class=\"item item-text-wrap\">It uses &nbsp;<a href=\"http://phonegap.com/\" target=\"_blank\">PhoneGap</a> for compiling/supporting different devices, &nbsp;<a href=\"http://angularjs.org/\" target=\"_blank\">AngularJs</a> for the application framework, &nbsp;<a href=\"http://gulpjs.com/\" target=\"_blank\">Gulp.js</a> for work-flow/application and &nbsp;<a href=\"http://ionicframework.com/\" target=\"_blank\">Ionic</a> a powerful HTML5 native app development framework.</div></div></ion-content></ion-view>");
$templateCache.put("/templates/tabs.html","<!--Create tabs with an icon and label, using the tabs-positive style.\nEach tab\'s child <ion-nav-view> directive will have its own\nnavigation history that also transitions its views in and out.--><ion-tabs tabs-style=\"tabs-icon-top\" tabs-type=\"tabs-default\" class=\"tabs-icon-top tabs-positive\"><!-- Home Tab--><ion-tab title=\"Home\" icon=\"icon ion-home\" href=\"#/tab/home\"><ion-nav-view name=\"home-tab\"></ion-nav-view></ion-tab><!-- Vendors Tab--><ion-tab title=\"Vendors\" icon=\"icon ion-star\" href=\"#/tab/vendors\"><ion-nav-view name=\"vendors-tab\"></ion-nav-view></ion-tab><!-- About Tab--><ion-tab title=\"About\" icon=\"icon ion-information-circled\" href=\"#/tab/about\"><ion-nav-view name=\"about-tab\"></ion-nav-view></ion-tab></ion-tabs>");
$templateCache.put("/templates/vendors.html","<ion-view title=\"Vendors\"><ion-content has-header=\"true\" has-tabs=\"true\" padding=\"true\"><div ng-repeat=\"vendor in vendors\" class=\"list\"><a href=\"{{vendor.link}}\" target=\"_blank\" class=\"item item-thumbnail-left\"><img src=\"img/{{vendor.image}}\"/><h2>{{vendor.name}}</h2><p>{{vendor.description}}</p></a></div></ion-content></ion-view>");}]);