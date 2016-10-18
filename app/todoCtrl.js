'use strict';

var app = angular.module('app');

app.config(function($mdThemingProvider) {
	$mdThemingProvider.theme('default').dark();
});

app.controller('todoCtrl', function ($scope, todoStorage) {

	todoStorage.getAllTabs()
	.then(function(tabs) {
		$scope.tabs = tabs;
	});

	$scope.active = function(id) {
		chrome.tabs.update(id, {active: true});
	};
});
