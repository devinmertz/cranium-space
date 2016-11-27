var app = angular.module("MainApp");
app.service("MainService", function ($http) {


	this.getQuizzes = function () {
		return $http.get("http://localhost:8000/quizzes")
			.then(function (response) {
				this.quizObj = response.data;
				return quizObj;
			})
	};

	this.postQuiz = function (quizObj) {
		return $http.post("http://localhost:8000/quizzes/", quizObj)
			.then(function (response) {
				var newQuiz = response.data;
				return newQuiz;
			})
	};

	this.getReminders = function () {
		return $http.get("http://localhost:8000/reminders")
			.then(function (response) {
				this.reminderObj = response.data;
				return reminderObj;
			})
	};

	this.postReminder = function (reminderObj) {
		return $http.post("http://localhost:8000/reminders/", reminderObj)
			.then(function (response) {
				var newReminder = response.data;
				return newReminder;
			})
	};
	
this.deleteReminder = function(reminderId) {
        return $http.delete("http://localhost:8000/reminders/" + reminderId).then(
            function(response) {
                var deletedReminder = response.data;
                return deletedReminder
            })
    };
})