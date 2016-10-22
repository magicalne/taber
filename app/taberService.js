angular.module('app').service('taberService', function ($q) {

	this.getAllTabs = function() {
		var deferred = $q.defer();
		chrome.tabs.query({}, function(data) {
			deferred.resolve(data);
		});
		return deferred.promise;
	}

	this.highlightFilter = function(target, keyword, htmlStart, htmlEnd) {
		if (!keyword || keyword.length === 0) {
			return target;
		}
		var result = '';
		var isHightlighten = false;
		for (var index = 0; index < target.length; index ++) {
			if (keyword.indexOf(target[index]) >= 0) {
				if (isHightlighten) {
					result += target[index];
				} else {
					isHightlighten = true;
					result += (htmlStart + target[index]);
				}
			} else {
				if (isHightlighten) {
					isHightlighten = false;
					result += (htmlEnd + target[index]);
				} else {
					result += target[index];
				}
			}
		}

		return result;
	}
});
