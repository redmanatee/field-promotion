var GameService = function($http) {
	var getGames = function($scope) {
		return $http.get('/game/').success(function(data) {
			$scope.games = data.games;
			$scope.games.created_at = $scope.games.created_at && new Date($scope.games.created_at)
        });
	};

	var submitGame = function(gameParams) {
		$http({
			method: 'POST',
			url: '/game/',
			data: $.param(gameParams),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function(key) { gameParams.key = key })
			.error(function() { alert('An error occured when trying to save the game.') });
	};

	var deleteGame = function(game) {
		$http({
			method: 'DELETE',
			url: '/game/' + game.key
		});
	};

	var searchGames = function($scope, search) {
		var searchParams = {};
		if (search.player_faction) {
			searchParams.player_faction = search.player_faction.name;
		}
		if (search.opponent_faction) {
			searchParams.opponent_faction = search.opponent_faction.name;
		}
		if (search.result) {
			searchParams.result = search.result.name;
		}
		if (search.player_warcaster) {
			searchParams.player_warcaster = search.player_warcaster.name;
		}
		if (search.opponent_warcaster) {
			searchParams.opponent_warcaster = search.opponent_warcaster.name;
		}
		searchParams.game_type = search.game_type;
		searchParams.location = search.location;
		searchParams.size = search.size;
		searchParams.opponent_name = search.opponent_name;

		$http.get('/game/', {params: searchParams}).success(function(data) {
			$scope.games = data.games;
			$scope.updatePerformance(data.win_count, data.non_teaching_count);
        });
	};

	return {
		getGames: getGames,
		submitGame: submitGame,
		deleteGame: deleteGame,
		searchGames: searchGames
    };
};

var services = angular.module('myApp.services');
services.service('GameService', GameService);
