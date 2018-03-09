app.controller('BlogDetailsController',function($scope,$location,BlogService,$rootScope,$sce,$routeParams) {
var id=$routeParams.id;
$scope.rejectionTxt=false;

         BlogService.getBlog(id).then(
		 function(response) {
			 $scope.blog=response.data
			 $scope.content=$sce.trustAsHtml($scope.blog.blogContent)
		 },function(response) {
			 $rootScope.error=response.data
			 if(response.status==401)
				 $location.path('/login')
		 })
		 
		 BlogService.hasUserLikedBlog(id).then(
		 function(response) {
			 if(response.data=='')
				 $scope.isLiked=false
				 else	 
					 $scope.isLiked=true
		 },function(response) {
			 $rootScope.error=response.data
			 if(response.status==401)
				 $location.path('/login')
		 })
		 
		 $scope.approve=function(blog) {
	     BlogService.approve(blog).then(function(response) {
		 $location.path('/blogsnotapproved')
	     },function(response) {
		 $rootScope.error=response.data
		 if(response.status==401)
			 $location.path('/login')
	     })
         }
 
         $scope.reject=function(blog) {
	     BlogService.reject(blog,$scope.rejectionReason).then(function(response) {
		 $location.path('/blogsnotapproved')
	     },function(response) {
		 $rootScope.error=response.data
		 if(response.status==401)
			 $location.path('/login')
	     })
         }
 
         $scope.showRejectionTxt=function() {
	     $scope.rejectionTxt=true;
         }
         
         $scope.updateLikes=function(id) {
         BlogService.updateLikes(id).then(
         function(response) {
        	   $scope.blog=response.data
        	   $scope.isLiked=!$scope.isLiked
         },function(response) {
        	   $rootScope.error=response.data
        	   if(response.status==401)
        	   $location.path('/login')
         })
         }
         
         $scope.addComment=function(blog,commentTxt){
        	 $scope.blogComment={}
        	 $scope.blogComment.blogPost=blog;
        	 $scope.blogComment.commentTxt=commentTxt;
     		BlogService.addComment($scope.blogComment).then(
     				function(response){
     					
     					$scope.commentTxt=''
     						getBlogComments(id)
     					
     				},function(response){
     					$rootScope.error=response.data
     					if(response.status==401)
     						$location.path('/login')
     						else{
     							$scope.exceptionMessage=response.data
     						}
     				})
     	}
         function getBlogComments(id){
        	 BlogService.getBlogComments(id).then(function(response){
        		 $scope.comments=response.data
        	 },function(response){
        		 $rootScope.error=response.data
        		 if(response.status==401)
        			 $location.path('/login')
        	 })
        	 
         }        
})