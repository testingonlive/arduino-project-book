// Project 4 - Color Mixing Lamp

@TODO TEST

var five = require( 'johnny-five' ),
    board = new five.Board();
 
board.on( 'ready', function(){
    var 
        // LEDs we'll be using
        LEDs = {
            greenLed: new five.Led( 9 ),
            redLed: new five.Led( 11 ),
            blueLed: new five.Led( 10 )
        },        
        
        // photoresistors we'll be using
        redSensor = new five.Sensor( 'A0' ),
        greenSensor = new five.Sensor( 'A1' ),
        blueSensor = new five.Sensor( 'A2');
        

    redSensor.on( 'data', logAndUpdate.bind( this, 'red' ) );
    greenSensor.on( 'data', logAndUpdate.bind( this, 'green' ) );
    blueSensor.on( 'data', logAndUpdate.bind( this, 'blue' ) );

    function logAndUpdate( col ) {
        // log out the values
        console.log( 'raw-' + col + ' value: ' + this.value );  
        console.log( 'mapped-' + col + ' value: ' + this.value/4 );

        // update the brightness
        LEDs[ col + 'Led' ].brightness( this.value/4 );
        
    }

});
