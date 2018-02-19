var app=angular.module('app',['ngRoute','ngCookies'])
app.config(function($routeProvider){
	$routeProvider
	.when('/register',{
		templateUrl:'views/registrationform.html',
		controller:'UserController'
	})
	.when('/login',{
		templateUrl:'views/login.html',
		controller:'UserController'
	})
	.otherwise({
		templateUrl:'views/home.html'
	})
	app.run(function($rootScope,$location,UserService,$cookieStore){
	if($rootScope.loggedInUser==undefined)
		$rootScope.loggedInUser=$cookieStore.get("currentuser")
		
		$rootScope.logout=function()
		{
		UserService.logout().then(function(response)
				{
			$rootScope.message="Logged out..."
				delete $rootScope.loggedInUser
				$cookieStore.remove("currentuser")
				$location.path('/login')
				},function(response)
				{
					$rootScope.error=response.data
					if(response.status==401)
					$location.path('/login')
				})
	}
})
	
})
