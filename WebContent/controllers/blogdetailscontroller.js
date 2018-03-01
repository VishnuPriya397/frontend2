app.controller('BlogDetailsController',function($scope,$location,BlogService,$rootScope,$sce,$routeParams) {
var id=$routeParams.id;
 BlogService.getBlog(id).then(
		 function(response) {
			 $scope.blog=response.data
			 $scope.content=$sce.trustAsHtml($scope.blog.blogContent)
		 },function(response) {
			 $rootScope.error=response.data
			 if(response.status==401)
				 $location.path('/login')
		 })
})