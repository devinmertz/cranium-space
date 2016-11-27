var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var logger = require('morgan');
var mongoose = require("mongoose");
var reminderRoutes = require("./routes/reminderRoutes");
var quizRoutes = require("./routes/quizRoutes");
var path = require('path');


var app = express();
mongoose.connect("mongodb://localhost/cranium", function(){
	console.log("Mongoose here!");
})

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "..", "frontend")));
app.use("/reminders", reminderRoutes);
app.use("/quizzes", quizRoutes);

app.listen(8000, function() {
    console.log("Server is running on port 8000!");
})