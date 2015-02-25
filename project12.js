// Project 12 - Knock Lock

var five = require( 'johnny-five' ),
    board = new five.Board();

board.on( 'ready', function(){
    
    // set up various elements

    // LEDs
    var yellow = new five.Led({ pin: 3, type: 'OUTPUT' }),
        green = new five.Led({ pin: 4, type: 'OUTPUT' }),
        red = new five.Led({ pin: 5, type: 'OUTPUT' }),

    // servo
        servo = new five.Servo({ pin: 9, range: [ 0, 90 ] }),

    // switch
        button = new five.Button( 2 ),

    // piezo, as sensor
        piezo = new five.Sensor( 'A0' ),

    // some state variables
        locked = false,
        knocks = 0;


    // function to lock the box
    function lock() {
        green.off();
        servo.max();
        red.on();
        knocks = 0;
        locked = true;

        console.log( 'The door is locked' );
    }

    // function to unlock the door
    function unlock() {
        red.off();
        servo.min();
        green.on();
        knocks = 0;
        locked = false;

        console.log( 'The door is unlocked' );
    }


    // lock the door when the button is pressed    
    button.on( 'press', lock );

         
    // use within to set valid 'knock' range    
    piezo.within([ 50, 100 ], function _knock(){
        
        // deal with the LED first
        clearTimeout( _knock.stoID );   
        yellow.on();
        _knock.stoID = setTimeout( function(){
            yellow.off();
        }, 5e2); 

        // bit off logging
        console.log( 'knock, knock' );      
        
        // increment knocks and check if we should unlock the door        
        if ( ++knocks >= 3 ) unlock();
    });

});
