// Project 9 - Motorized Pinwheel

var five = require( 'johnny-five' ),
	board = new five.Board();

board.on( 'ready', function(){

	var button = new five.Button( 2 ),
		motor = new five.Motor( 9 ),
		pot = new five.Sensor( 'A0' ),
		// check if button is pressed		
		on = false;

	pot.scale( [ 0, 255 ] ).on( 'data', function(){
		var speed = +this.value;
		console.log( 'scaled value - ' + speed.toFixed( 2 ) );		
				
		motor.stop();

		if ( on ) motor.start( speed );
		
	});	

	button.on( 'press', function(){
		on = true;
	});

	button.on( 'release', function(){
		on = false;
	});


});
