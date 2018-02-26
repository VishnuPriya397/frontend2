app.factory('JobService',function($http){
	var jobService={}
	jobService.addJob=function(job){
		return $http.post("http://localhost:8181/middleware/addjob",job)
	}
	
	jobService.getAllJobs=function(){
		return $http.get("http://localhost:8181/middleware/alljobs")
	}
	
	jobService.getJobById=function(id){
        console.log(id)
        return $http.get("http://localhost:8181/middleware/getjobbyid/"+id)
    }
	
	return jobService;
})