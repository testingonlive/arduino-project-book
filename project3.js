// Project 3 - Love-o-Meter
var five = require( 'johnny-five' ),
    board = new five.Board();

board.on( 'ready', function(){
    var sensor = new five.Sensor( 'A0' ),
        led2 = new five.Led( 2 ),
        led3 = new five.Led( 3 ),
        led4 = new five.Led( 4 ),
	    temp = 0,
        baseLineTemp = 14;

    sensor.on( 'data', function(){
        var voltage = this.value / 1024 * 5,
            temperature = ( voltage - 0.5 ) * 100;

        temp = temperature;

        led2.off();
        led3.off();
        led4.off();  

        if ( temperature >= baseLineTemp + 1 ) led2.on();
        if ( temperature >= baseLineTemp + 2 ) led3.on();
        if ( temperature >= baseLineTemp + 3 ) led4.on();
        
        
        //console.log( 'Sensor Value: ' + this.value + ', Volts: ' + voltage + ', degrees C: ' + temperature );
        
    });

	setInterval( function(){
        console.log( 'degrees C: ' + temp.toFixed( 2 ) );
    }, 1000 )

});
