// Project 10 - Zoetrope 
// @TODO check the pot is changing speed
// @TODO try and use motot constructor

var five = require( 'johnny-five' ),
	board = new five.Board();

board.on( 'ready', function(){
	
	var dir = new five.Button( 4 ),
		onOff = new five.Button( 5 ),
		pot = new five.Sensor( 'A0' ),
		
		// pin 2 + 3 used to communicate with h-bridge
		pin2 = new five.Pin( 2 ),
		pin3 = new five.Pin( 3 ),

		// pwm write to h-bridge
		pwm = new five.Pin( { pin: 9, type: 'digital' } ),

		// couple varibles to store state
		on = false,
		clockwise = true;


	// when dir button is pressed flip direction var	
	dir.on( 'press', function(){
		clockwise = !clockwise;
	});

	// when onOff button is pressed flip n var
	onOff.on( 'press', function(){		
		on = !on;
	});
	

	pot.scale( [ 0, 255 ] ).on( 'data', function(){		
				
		// reset the control pins to low
		pin2.low();
		pin3.low();			
		
		// are we good to go
		if ( !on ) return;	

		// set the direction		
		if ( clockwise ){			
			pin3.high();
		} else {
			pin2.high();
		}
				
		// set the speed
		pwm.write( this.value );

	});



}); 
