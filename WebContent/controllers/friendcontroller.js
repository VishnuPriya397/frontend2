app.controller('FriendController',function($scope,$location,$rootScope,FriendService) {
	function getAllSuggestedUsers() {
		FriendService.getAllSuggestedUsers().then(
				function(response) {
					$scope.suggestedUsers = response.data
					$location.path('/home')
				},
				function(response) {
					$rootScope.error=response.data
					if(response.status==401)
						$location.path('/login')
				})
	}
	
	getAllSuggestedUsers()
	
})