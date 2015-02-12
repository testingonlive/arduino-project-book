// Project 9 - Motorized Pinwheel
// @TODO use potentiometer to vary speed

var five = require( 'johnny-five' ),
	board = new five.Board();

board.on( 'ready', function(){

	var button = new five.Button( 2 ),
		motor = new five.Motor( 9 );

	button.on( 'press', function(){
		// bit noisy at full speed		
		motor.start( 50 );	
	});

	button.on( 'release', function(){
		motor.stop();
	});


});
