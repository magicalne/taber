'use strict';

var app = angular.module('app');

app.config(function($mdThemingProvider) {
	$mdThemingProvider.theme('default').dark();
});

app.controller('taberController', function ($scope, taberService ) {

	taberService.getAllTabs()
	.then(function(tabs) {
		$scope.tabs = tabs;
		$scope.filteredTabs = tabs;
	});

	$scope.active = function(id) {
		chrome.tabs.update(id, {active: true});
	};

	$scope.onChange= function() {
		//1. iterator tabs, calculate string_score
		//2. save result in to an array
		//3. sort the array
		$scope.filteredTabs= calculate($scope.tabs, $scope.keyword.trim());
		
	}

	var calculate = function(tabs, keyword) {
		if (!!keyword && !!tabs) {
			if (keyword === '') {
				return tabs;
			}
			var titleScore, urlScore, title, url;
			return tabs.map(function(tab) {
				title = tab.title;
				url = tab.url;
				titleScore = (title ? title.score(keyword) : 0);
				urlScore = (url ? url.score(keyword) : 0);
				tab.score = (titleScore > urlScore) ? titleScore : urlScore;
				return tab;
			}).filter(function(tab) {
				return tab.score > 0;
			}).sort(function(a, b) {
				return (b.score - a.score);
			});
		} else {
			return tabs;
		}
	}
});

app.directive('taberEnter', function() {
	return function(scope, element) {
		element.bind("keydown keypress", function(event) {
			if (event.which === 13) {
				scope.active(scope.filteredTabs[0].id);
			}
		})
	}
})
