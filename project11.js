// Project 11 - Crystal Ball

var five = require( 'johnny-five' ),
    board = new five.Board();

board.on( 'ready', function(){
    
    // would have like to of used object for pins but appears not to work
    // rs, en, d4, d5, d6, d7
    // 12, 11, 5,  4,  3,  2    
    var lcd = new five.LCD({        
            pins: [ 12, 11, 5, 4, 3, 2 ]
        }),
        tilt = new five.Sensor.Digital( 6 );

   // throttle the tilt event a bit - borrowed from project8.js
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

    // array of possible replies
    var replies = [
        'Yes',
        'Most likely',
        'Certainly',
        'Outlook good',
        'Unsure',
        'Ask again',    
        'Doubtful',
        'No'
    ];
    
    
    // function to print the welcome message
    var welcomeMsg = function(){
        lcd
            .clear()
            .print( 'Ask the' )
            .cursor( 1, 0 )
            .print( 'Cystal Ball!' ); 
    };
         
    // display the welcome message
    welcomeMsg();

    tilt.on( 'change', function _change(){
        
        // change fires on ready so we'll do this;
        if ( !_change.first ) return _change.first = true;
                
        // if tilted in the last second just return        
        if ( !tilted( 1e3 ) ) return;

        
        // grap the reply index then display it
        var reply = 0 | Math.random() * replies.length;

        lcd
            .clear()
            .print( 'The ball says: ' )
            .cursor( 1, 0 )
            .print( replies[ reply ] );

        // return to the the welcome message after a bit
        setTimeout( welcomeMsg, 3e5);

    });
    
});
