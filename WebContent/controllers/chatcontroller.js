app.controller('ChatController', function($rootScope, $scope, ChatService) {

	$scope.stompClient = ChatService.stompClient
	$scope.users = [];
	$scope.chats = [];

	$scope.$on('SockConnected', function(event, frame) {
		alert('Connected with WebSocket')
		$scope.userName = $rootScope.loggedInUser.firstname
		alert($scope.userName + 'joined chat')
		$scope.stompClient.subscribe("/app/join/" + $scope.userName, function(
				message) {
			console.log(message.body)
			$scope.users = JSON.parse(message.body)
			$scope.$apply();
		})

		$scope.stompClient.subscribe("/topic/join/",
				function(message) {
					user = JSON.parse(message.body);
					if (user != $scope.userNamen
							&& $.inArray(user, $scope.users) == -1) {
						$scope.addUser(user);
						$scope.latestUser = user;
						$scope.$apply();
						$('#joinedChat').fadeIn(500).delay(10000).fadeOut(500);
					}
				})
	})

	$scope.addUser = function(user) {
		$scope.users.push(user)
		$scope.$apply()
	}

	$scope.sendMessage = function(chat) {
		chat.from = $scope.userName
		$scope.stompClient.send("/app/chat", {}, JSON.stringify(chat))
		$rootScope.$broadcast('sendingChat', chat)
		$scope.chat.message = ''
	}

	$scope.$on('sockConnected', function(event, frame) {
		$scope.userName = $rootScope.loggedInUser.firstname;
		$scope.stompClient.subscribe("/queue/chats", function(message) {
			$scope.processIncomingMessage(message, true)
		});

		$scope.stompClient.subscribe("/queue/chats/" + $scope.userName,
				function(message) {
					$scope.processIncomingMessage(message, false)

				});
	})
	$scope.processIncomingMessage = function(message, broadcast) {
		message = JSON.parse(message.body);
		message.direction = 'incoming'
		if (message.from != $scope.userName) {
			$scope.addChat(message);
			$scope.$apply()
		}
	}
	
	$scope.addChat=function(chat){
		$scope.chats.push(chat)
	}
	
	$scope.$on('sendingChat', function(event, sentChat){
		chat=angular.copy(sentChat)
		chat.from='Me'
			chat.direction='Outgoing'
				$scope.addChat(chat)
				
			
	})
})