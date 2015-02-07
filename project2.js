// Project 2 - Spaceship Interface

var five = require( 'johnny-five' ),
	board = new five.Board();

board.on( 'ready', function(){
    var led5 = new five.Led( { pin: 5, type: 'OUTPUT' } ),
        led4 = new five.Led( 4 ),
        led3 = new five.Led( { pin: 3, type: 'OUTPUT' } ).on(),
        button = new five.Button( 2 ),
        timeOut;

    this.repl.inject({
        led3: led3,
        led4: led4,
        led5: led5
    });


    button.on( 'press', function(){
        led3.off();
        led4.on();

        timeOut = setInterval( function(){
            led4.toggle();
            led5.toggle();
        }, 250 );
    });

    button.on( 'release', function(){
        clearInterval( timeOut );
        led3.on();
        led4.off();
        led5.off();

    });

});
