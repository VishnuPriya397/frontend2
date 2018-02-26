app.controller('JobController',function($scope,$rootScope,$location,JobService,$cookieStore)
		{
	$scope.registerUser=function(user)
	{ 
		$scope.addJob=function(job){
		  JobService.addJob(job).then(
		   function(response){		  
			alert('Job details posted Successfully')
			$location.path('/home')
		},function(response)
		{
			$rootScope.error=response.data
			if(response.status==401)
			 $location.path('/login')
		})
		
	}
		JobService.login(user).then(function(response){
			Scope.jobs=response.data
		},function(response){
			$rootScope.error=response.data
			if(response.status=404)
			$location.path('/login')
		})
	}
	if($rootScope.loggedInUser!=undefined){
		UserService.getUser().then(
				function(response){
					$scope.user=response.data
				},
				function(response){
					if(response.status==401)
						$location.path('/login')
				
				})
}
	$scope.updateUser=function(user){
		UserService.updateUser(user).then(function(response){
			alert('update user profile successfully.....')
			$rootScope.loggedInUser=response.data
			$cookieStore.put('loggedInUser',response.data)
			$location.path('/home')
			},
			function(response){
				if(response.status==401)
					$location.path('/login')
					else
						$scope.error=response.data
			
		})
    }
})
	
	