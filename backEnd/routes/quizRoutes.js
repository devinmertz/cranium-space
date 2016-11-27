var express = require('express');
var quizRoute = express.Router();
var Quiz = require("../schemas/quizSchema");

quizRoute.route("/")
	.get(function (req, res) {
		Quiz.find({}, function (err, quizzes) {
			if (err) res.status(500).send(err);
			res.send(quizzes)
		})
	})
	.post(function (req, res) {
		var newQuiz = new Quiz(req.body); 

		newQuiz.save(function (err, savedQuiz) {
			if (err) res.status(500).send(err);
			res.send(savedQuiz);
		})
	})

quizRoute.route("/:id")
	.get(function (req, res) {
		var quizID = req.params.id; 
		Quiz.findOne({
				_id: quizID
			})
			.poplulate("content.question")
			.exec(function (err, foundQuiz) {
				if (err) res.status(500).send(err);
				res.send(foundQuiz);
			})
	})

.put(function (req, res) {
	var quizID = req.params.id;
	Quiz.findOneAndUpdate({
		_id: quizID
	}, req.body, {
		new: true
	}, function (err, updatedQuiz) {
		if (err) res.status(500).send(err);
		res.send(updatedQuiz);
	})
})

.delete(function(req, res) {
	var quizID = req.params.id;
	Quiz.findOneAndRemove({
		_id: quizID
	}, function(err, deletedQuiz) {
		if (err) res.status(500).send(err);
		res.send(deletedQuiz);
	})
});

module.exports = quizRoute;