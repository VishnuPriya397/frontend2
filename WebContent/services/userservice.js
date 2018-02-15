/**
 * 
 */
app.factory('UserService',function($http){
	var userService={}
	
	userService.registerUser=function(user){
	
	console.log('in userservice'+user)	
	console.log(user)
	return	$http.post("http://localhost:8181/middleware/registeruser",user)
	}
	userService.login=function(user){
		console.log('userservice-> login')
		console.log(user)
		return $http.post("http://localhost:8181/middleware/login",user)
	}
	return userService;
})