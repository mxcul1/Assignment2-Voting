//Initiliase varaibles for server use
const express = require('express');
const app = express();
const admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
var http = require('http').Server(app);
var router = express.Router();


//initialise board
var five = require('johnny-five');
var board = new five.Board();

//Initialise database connection
admin.initializeApp({
  databaseURL: "https://project1-1d4a2.firebaseio.com/",
  credential: admin.credential.cert(serviceAccount)
});

//initialise database variables
var db = admin.database();
var alldata = db.ref("serverData");
var vca = db.ref("serverData").child("variables").child("VCA")
var cca = db.ref("serverData").child("variables").child("CCA")

//allow errors to be printed to console
alldata.on("value", function(snapshot) {
	console.log(snapshot.val())
	}, function(errorObject){
	console.log("Failed" + errorObject.code)
});


//get board ready, and observing
board.on("ready", function(){
	var pin = 7;
	var motion = new five.Motion(pin);

  // "calibrated" occurs once, at the beginning of a session,
  motion.on("calibrated", function() {
    console.log("calibrated");
  });

	//initialise start time
	motion.on("motionstart", function() {
		startDate = new Date();
		startTime = startDate.getTime();
		console.log("Motion has started at" + startTime)
	});

	//initialise end time
	motion.on("motionend", function() {
		endDate = new Date();
		endTime = endDate.getTime();
		console.log("Motion has ended at" + endTime);

		//create variable to hold motion time
		motionTime = endTime - startTime

		//now check to see whether value was short or long motion, using milliseconds
		if((motionTime > 5000)) {
			console.log("A long motion has been detected.");
			vca.transaction(function(VCA){
				return(VCA || 0) + 1
			});
		}
		else if((motionTime < 5000)&&(motionTime > 0)) {
			console.log("A short motion has been detected.");
				vca.transaction(function(VCA){
					return(VCA || 0) - 1
				});
		};
	});
});

router.use(function(req, res, next){
	next()
});

router.get("/", function(req, res){
	res.sendFile("index.html", {root: __dirname});
});


router.get("/error", function(req, res){
	res.sendFile("error.html", {root: __dirname});
});

router.get("/voting", function(req, res){
	res.sendFile("voting.html", {root: __dirname});
});

app.use("/", router)

http.listen(8080, function(){
	console.log("Live at port 8080")
});
