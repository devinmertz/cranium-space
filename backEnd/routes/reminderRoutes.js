var express = require('express');
var reminderRoute = express.Router();
var Reminder = require("../schemas/reminderSchema");

reminderRoute.route("/")
	.get(function (req, res) {
		Reminder.find({}, function (err, reminders) {
			if (err) res.status(500).send(err);
			res.send(reminders)
		})
	})
.post(function(req, res) {
	var newReminder = new Reminder(req.body);
	newReminder.class = req.body.class;
	console.log("here is" + req.body.class);
	newReminder.save(function(err, savedReminder){
		if (err) res.status(500).send(err);
		res.send(savedReminder);
	})
	
})

reminderRoute.route("/:id")
.get(function(req, res){
	var reminderID = req.params.id;
	Reminder.findOne ({
		_id: reminderID
	})
	.exec(function (err, foundReminder) {
		if (err) res.status(500).send(err);
		res.send(foundReminder);
	})
})

.put(function (req, res) {
	var reminderID = req.params.id;
	Reminder.findOneAndUpdate({
		_id: reminderID
	}, req.body, {
		new:true
	}, function (err, updatedReminder) {
		if (err) res.status(500).send(err);
		res.send(updatedReminder);
	})
})

.delete(function(req, res) {
	var reminderID = req.params.id;
	Reminder.findOneAndRemove({
		_id: reminderID
	}, function(err, deletedReminder) {
		if (err) res.status(500).send(err);
		res.send(deletedReminder);
	})
});

module.exports = reminderRoute;

