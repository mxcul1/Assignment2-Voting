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
//alldata.push(20)
//if long motion
vca.transaction(function(VCA){
	return(VCA || 0) + 1 
})
//else
	vca.transaction(function(VCA){
	return(VCA || 0) - 1 
})