// project 6 - Light Theremin

// not overly keen on this code at the moment...

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

    
    ldr.on( 'data', function(){
        
        if ( new Date() - time < 5e3 ){
            // calibratting
            led.on()
            if ( this.value > high ) high = this.value;
            if ( this.value < low ) low = this.value;
        } else {
            // not calibratting
            led.off()
            
            // map the values
            val = five.Fn.map( this.value, low, high, 50, 4000 );

            // make some noise
            piezo.tone( val, 20 );

        }  


               


    })


    
    



});
