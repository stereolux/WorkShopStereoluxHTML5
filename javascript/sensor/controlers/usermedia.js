sensor.controller('UserMediaCtrl', 
	['$rootScope', '$scope', '$http','CheckFactory','WebSocketFactory','ModelFactory',
	function($rootScope, $scope, $http, check, socket, model) {

		$scope.available = check.userMediaAvailable();

		socket.changeRoute("/usermedia");
		
}]);