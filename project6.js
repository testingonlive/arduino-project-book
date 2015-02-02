// project 6 - Light Theremin

var five = require( 'johnny-five' ),
    board = new five.Board();


board.on( 'ready', function(){
    
    // lets grab the LED (on board), LDR + piezo
    var led = new five.Led( 13 ),
        ldr = new five.Sensor( 'A0' ),
        piezo = new five.Piezo( 8 ),
    
    // variables used in calibrating
        low = 1023,
        high = 0,
        val,
        time = new Date();

    // calibrate function 
    function calibrate(){          
        if ( this.value > high ) high = this.value;
        if ( this.value < low ) low = this.value;
    }

    function tone(){
        // map the values
        val = five.Fn.map( this.value, low, high, 50, 4000 );

        // make some noise
        piezo.tone( val, 20 );
    }
         
    // calibrating
    led.on();
    ldr.on( 'data', calibrate )

    // turn off calibration then start playing tone
    setTimeout( function(){ 
        console.log( low + ' - ' + high );      

        led.off();
        
        ldr.removeListener( 'data', calibrate )
           .on( 'data', tone );

    }, 5e3 );


});
