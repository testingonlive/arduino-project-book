// Project 8 - Digital Hourglass

var five = require( 'johnny-five' ),
    board = new five.Board();

board.on( 'ready', function(){

    var tilt = new five.Sensor.Digital( 8 ),
        // seems like a sensible way to set the pin No        
        ledArr = [ 2, 3, 4, 5, 6, 7 ],
		ledArrLen = ledArr.length,
		// tilt change fires onready, hence -1		
		dir = -1,
        count = 0;

    // overwrite pin no with LED obj   
    ledArr.forEach( function( elm, ind, arr ){
        arr[ ind ] = new five.Led( { pin: elm, type: 'OUTPUT' } );
    }); 

    
    // might replcae this with setInterval        
    setInterval( function(){
		// bit of logging		
		console.log( count + ' - ' + dir );

		// depending on the direction, off or on	
		~( Math.abs( dir ) / dir ) ? ledArr[ count ].on() : ledArr[ count ].off();
		
		// id increamenting count will result in a valid value do it
		if ( count + dir >= 0 && count + dir < ledArrLen ) count = count + dir;

    }, 2e3 );

    // throttle the tilt event a bit
	var tilted = (function(){
		var _tilted = false;
		
		return function ( no ){
			
			if ( !_tilted ) {
				setTimeout(function(){
					_tilted = false;					
				}, no )

				return _tilted = true;
			} else {
				return false;
			}

		}

	}());
	
    // if the tilt changes, reset    
    tilt.on( 'change', function(){		
		// second seems like a good value to start with        
		if ( tilted( 1e3 ) ) dir *= -1;
    })
    
    

});

