angular.module('app').service('todoStorage', function ($q) {

	this.getAllTabs = function() {
		var deferred = $q.defer();
		chrome.tabs.query({}, function(data) {
			deferred.resolve(data);
		});
		return deferred.promise;
	}
});
