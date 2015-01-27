// Project 5 - Mood Cue

var five = require( 'johnny-five' ),
    board = new five.Board();

board.on( 'ready', function(){
    
    // lets grab the potentiometer and the servo
    var pot = new five.Sensor( 'A0' ),
        servo = new five.Servo( 9 );

    // reset the servo, this really isn't worth it.
    servo.center();

    pot.scale( [ 0, 180 ] ).on( 'data', function(){
        var _val = +this.value;
        
        console.log( 'scaled value - ' + +_val.toFixed( 2 ) );
        servo.to( _val );
    });

});
