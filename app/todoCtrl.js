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

	$scope.onChange= function() {
		console.log('test')
		//1. iterator tabs, calculate string_score
		//2. save result in to an array
		//3. sort the array
		$scope.tabs = calculate($scope.tabs, $scope.keyword);
		
	}

	var calculate = function(tabs, keyword) {
		if (keyword) {
			var titleScore, urlScore, title, url;
			for (var index = 0; index < tabs.length; index ++) {
				title = tabs[index].title;
				url = tabs[index].url;
				titleScore = (title ? keyword.score(title) : 0);
				urlScore = (url ? keyword.score(url) : 0);
				tabs[index].score = (titleScore > urlScore) ? titleScore : urlScore;
			}
			return tabs.sort(function(a, b) {
				if (a.score > b.score) {
					return 1;
				} else if (a.score < b.score) {
					return -1;
				} else {
					return 0;
				}
			})
		} else {
			return tabs;
		}
	}
});
