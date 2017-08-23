const five = require('johnny-five');
const firebase = require("firebase");
//Initialise database connection




firebase.initializeApp({
  databaseURL: "https://project1-1d4a2.firebaseio.com/"
});
const database = firebase.database();
five.Board().on('ready', function() {	
	const pin = 5
	console.log('Ardiuno is active.');
	const motion = new five.Motion(pin);
	const motionLength = 0;
	
	//This is updating the Motion Switch to on or off
	database.ref('motionSwitch').on('value', function(snapshot) {
				motionSensorOn = snapshot.val();
			});
				
	// Occurs when the sensor detects the start of a motion
	motion.on("motionstart", function() {
		if (motionSensorOn) {
			motionLength = Date.now();
			console.log("motionstart");
		};
	});
	
	// When motion stops, call function
	motion.on("motionend", function() {
		if (motionSensorOn) {
			motionLength = Date.now() - motionLength;
			console.log("motionend", motionLength);
			
			//If motion is longer than 5 seconds, long motion, voter is entering station
			const threshold = 5000;
			if (motionLength > threshold) {
				//increment VCA
				
				if VCA > CCA {
					//call function to create client and redirect to it
					} elif VCA <= CCA {
						//direct to error page
						}
				});
			//Else motion is a short motion, voter is leaaving station 
			} else {
				if VCA > 1 {
					VCA = VCA - 1; 
				} else {
					return error
					}
					
				});

				
			};
		};
	});
	
	
	
	
	
}