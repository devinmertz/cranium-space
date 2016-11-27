var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var reminderSchema = require("./reminderSchema").Schema;

var quizSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	subject: {
		type: String,

	},
	class: {
		type: String
	},
	content: [{
		question: String,
		answer: Schema.Types.Mixed
	}],
	
});

module.exports = mongoose.model("quiz", quizSchema);