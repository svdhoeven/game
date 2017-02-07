/** Imports */
//Libraries
import $ from 'jquery';
import Logic from './logic/Logic.js'
import Engine from './engine/Engine.js'

/** Set global scope variables */
//Core variables
let logic,
    engine;


//Call init when done loading (jQuery magic)
$(init);

/**
 * Initializes the Canvas object and starts the game loop
 *
 */
function init(){
    logic = new Logic();
    engine = new Engine();

    engine.start();
    loop();
}


function loop(){
    "use strict";
    requestAnimationFrame(loop);

    engine.update();
    engine.draw();
    engine.statistics();
}