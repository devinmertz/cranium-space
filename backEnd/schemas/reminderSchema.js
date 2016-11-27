var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var quizSchema = require("./quizSchema").Schema;

var reminderSchema = new Schema({

	message: String,
	class: String,
});

module.exports = mongoose.model("reminder", reminderSchema);