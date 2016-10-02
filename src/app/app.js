require('angular');
d3 = require('d3');
require('angular-ui-router');
require('angular-aria');
require('angular-animate');
require('angular-material');
require('angular-socket-io');
require('../../node_modules/n3-charts/build/LineChart.js');


require('./components/home/home.js');
require('./components/about/about.js');

var app = angular.module('myApp', ['ui.router','ngMaterial','btford.socket-io','myApp.home','myApp.about','n3-line-chart'])

app.config(function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise("/");
	
	$stateProvider
	.state('home', {
		url: "/",
		views : {
			"" : {
				templateUrl:"app/components/home/home.html",
			},
			"header@home":{
				templateUrl:"app/shared/header/header.html"
			}
		}
	})
	.state('about', {
		url: "/about",
		views : {
			"" : {
				templateUrl:"app/components/about/about.html"
			},
			"header@about":{
				templateUrl:"app/shared/header/header.html"
			}
		}
	});
});

app.factory('mySocket', function (socketFactory) {
  var myIoSocket = io.connect('http://kaboom.rksv.net/watch');

  mySocket = socketFactory({
    ioSocket: myIoSocket
  });

  return mySocket;
});

app.config(function($mdThemingProvider) {
  //disable theme generation

  //themes are still defined in config, but the css is not generated
  $mdThemingProvider.theme('altTheme')
    .primaryPalette('purple')
    .accentPalette('green');
});