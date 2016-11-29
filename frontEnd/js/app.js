var app = angular.module("MainApp", ['ngRoute']);

app.config(function ($routeProvider) {
	$routeProvider
		.otherwise("/", {
			templateUrl: "./templates/home.html",
			controller: "MainController"
		})
		.when("/", {
			templateUrl: "./templates/home.html",
			controller: "MainController"
		})

	.when("/study", {
		templateUrl: "./templates/study.html",
		controller: "MainController"
	})

	.when("/reminders", {
		templateUrl: "./templates/reminders.html",
		controller: "MainController"
	})
});

app.controller("MainController", ["$scope", "MainService", function ($scope, MainService) {


	$scope.titleInput = "";
	$scope.contentInput = "";
	$scope.newInput = "";
	$scope.messageInput = "";
	$scope.classInput = "";
	$scope.qInput = "";
	$scope.aInput = "";
	$scope.remindersList;

	$scope.getQuizzes = function () {
		MainService.getQuizzes()
			.then(function (quizObj) {
				$scope.quizList = quizObj;
			})
	};

	$scope.postQuiz = function (quizObj) {
		var quizObj = {
			title: $scope.titleInput,
			content: {
				question: $scope.qInput,
				answer: $scope.aInput
			}
		}

		MainService.postQuiz(quizObj)
			.then(function (newQuiz) {
				$scope.quizList.push(newQuiz);

			})
	};

	$scope.getReminders = function () {
		MainService.getReminders()
			.then(function (reminderObj) {
				$scope.remindersList = reminderObj;
			})
	};

	$scope.postReminder = function () {
		var reminderObj = {
			message: $scope.messageInput,
			class: $scope.classInput
		};

		MainService.postReminder(reminderObj)
			.then(function (newReminder) {
				$scope.remindersList.push(newReminder);
				$scope.messageInput = "";
				$scope.classInput = "";
			})
	};
	
	 $scope.deleteReminder = function(reminderId, index) {
        MainService.deleteReminder(reminderId).then(
            function(deleteReminder) {
                if (deleteReminder) {
                    $scope.remindersList.splice(index, 1);
                };
            })
    };



	$scope.getQuizzes();
	$scope.getReminders();
}]);