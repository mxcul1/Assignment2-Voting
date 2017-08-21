const five = require('johnny-five');
const firebase = require("firebase");
//Initialise database connection
firebase.initializeApp({
  databaseURL: "https://project1-1d4a2.firebaseio.com/"
});
const database = firebase.database();
five.Board().on('ready', function() {
	const CCA = 0; //clients currently available
	const VCA = 0; //voters currently available
	
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
			
			//If motion is longer than 5 seconds, becomes a long motion, else short
			if (motionLength > 5000) {
				VCA = VCA+1; 
				if VCA > CCA {
					//call function to create client and redirect to it
					} elif VCA <= CCA {
						//direct to error page
						}
				});
				
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