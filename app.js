const express = require('express');
const app = express();
//const five = require('johnny-five');
const admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
//Initialise database connection

admin.initializeApp({
  databaseURL: "https://project1-1d4a2.firebaseio.com/",
  credential: admin.credential.cert(serviceAccount)
});      

var db = admin.database();
var alldata = db.ref("serverData");
var vca = db.ref("serverData").child("variables").child("VCA")


alldata.on("value", function(snapshot) {
	console.log(snapshot.val())
	}, function(errorObject){ 
	console.log("Failed" + errorObject.code) 
});


//get board ready 
board.on("ready", function){
	var pin = 5;
	var motion = new five.motion(pin);
	var startTime = 0;
	var endTime = 0;
	
	motion.on("motionStart", function() {
		var startDate = new Date();
		var startTime = startDate.getTime();
		console.log("Motion has started at" + startTime)
	});
	
	motion.on("motionEnd", function() {
		var endDate = new Date();
		var endTime = endDate.getTime();
		console.log("Motion has ended at" + endTime();
	});
});


//alldata.push(20)
//if long motion
vca.transaction(function(VCA){
	return(VCA || 0) + 1 
})
//else
	vca.transaction(function(VCA){
	return(VCA || 0) - 1 
})