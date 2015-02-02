// project 7 - Keyboard Instrument

var five = require( 'johnny-five' ),
    board = new five.Board();

board.on( 'ready', function() {

    // set up an array of notes + other things
    var notes = [ 262, 294, 330, 349 ],
        piezo = new five.Piezo( 8 );

    // set up analog input 0 with callback     
    this.pinMode( 0, five.Pin.ANALOG );    
    this.analogRead( 0, function( val ){
        console.log( val )        
                
        // set the note.         
        var note = ( val === 1023 ) ? notes[ 0 ] :
                   ( val >= 990 && val <= 1010 ) ? notes[ 1 ] :
                   ( val >= 505 && val <= 515 ) ? notes[ 2 ] :
                   ( val >=5 && val <= 10 ) ? notes[ 3 ] :
                   false;
                
        // play the note, or note.        
        note && piezo.frequency( note, 20 )

    });


});
