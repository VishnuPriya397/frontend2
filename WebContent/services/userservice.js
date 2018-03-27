app.factory('UserService', function($http) {
	var userService = {}

	userService.registerUser = function(user) {
        console.log('in userservice' + user)
		console.log(user)
		return $http.post("http://localhost:8181/middleware/registeruser", user)
	}
	userService.login = function(user) {
		console.log('userservice-> login')
		console.log(user)
		return $http.post("http://localhost:8181/middleware/login", user)
	}
	userService.logout = function(user) {
		console.log('loggedout succesfully')
		return $http.put("http://localhost:8181/middleware/logout")
	}
	userService.getUser = function() {
		return $http.get("http://localhost:8181/middleware/getuser")
	}
	userService.updateUser = function(user) {
		return $http.put("http://localhost:8181/middleware/updateuser", user)
	}
	userService.searchUser=function(user) {
		return $http.get("http://localhost:8181/project2backend/searchuser/"+user)
	}

	return userService;
})
