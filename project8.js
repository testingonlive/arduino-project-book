// Project 8 - Digital Hourglass

// @TODO clean up JS
// @TODO countdown after tilt instead of reset

var five = require( 'johnny-five' ),
    board = new five.Board();

board.on( 'ready', function(){

    var tilt = new five.Sensor.Digital( 8 ),
        // seems like a sensible way to set the pin No        
        ledArr = [ 2, 3, 4, 5, 6, 7 ],
        count = 0;

    // overwrite pin no with LED obj   
    ledArr.forEach( function( elm, ind, arr ){
        arr[ ind ] = new five.Led( { pin: elm, type: 'OUTPUT' } );
    }); 

    
    // might replcae this with setInterval        
    setInterval( function(){
        if ( count < ledArr.length ) ledArr[ count++ ].on();
        

    }, 2000);

    
	
    // if the tilt changes, reset    
    tilt.on( 'change', function(){
        console.log( this.value );
        ledArr.forEach( function( elm ){
            elm.off();
        });

        count = 0;
    })
    
    

});

