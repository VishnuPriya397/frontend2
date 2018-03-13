app.factory('NotificationService',function($http) {
	var notificationService={}
	notificationService.getNotificationsNotViewed=function() {
		 return $http.get("http://localhost:8181/middleware/getnotifications")
	}
	
	notificationService.getNotification=function(id) {
		return $http.get("http://localhost:8181/middleware/getnotification/"+id)
	}
	
	notificationService.updateNotification=function(id) {
		return $http.put("http://localhost:8181/middleware/updatenotification/"+id)
	}
	
	return notificationService;
})