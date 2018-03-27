app.factory('FriendService',function($http){
	var friendService={}
	friendService.getAllSuggestedUsers=function(){
		return $http.get("http://localhost:8181/middleware/suggestedusers")
	}
	friendService.addFriend=function(toId){
		console.log(toId)
		return $http.post("http://localhost:8181/middleware/addfriend",toId)
	}
	friendService.getPendingRequests=function(){
		return $http.get("http://localhost:8181/middleware/pendingrequests")
	}
	friendService.acceptRequest=function(request) {
		return $http.put("http://localhost:8181/middleware/acceptrequest",request);
	}
	
	friendService.deleteRequest=function(request) {
		return $http.put("http://localhost:8181/middleware/deleterequest",request)
	}
	
	friendService.getAllFriends=function() {
		return $http.get("http://localhost:8181/middleware/friends")
	}

	return friendService;
})