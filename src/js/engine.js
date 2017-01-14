/** Imports */
//Libraries
import $ from 'jquery';
import jQuery from 'jquery';

//CoreObjects
import Canvas from './coreObjects/Canvas';

//GameObjects

/** Set global scope variables */
//Core variables
let canvas,
    engine,
    fps = 30;

//GameObjects variables
let gameObjects;


//Call init when done loading (jQuery magic)
$(init);

/**
 * Initializes the Canvas object and starts the game loop
 *
 */
function init(){
    //Init canvas
    canvas = new Canvas();
    canvas.$el.appendTo('main');
    engine = canvas.$el.get(0).getContext('2d');

    //Init gameObjects

    //Init game loop
    setInterval(function() {
        update();
        draw();
    }, 1000/fps);
}

/**
 * Update gameObjects
 */
function update(){

}

/**
 * Draw gameObjects
 */
function draw(){
    engine.clearRect(0, 0, canvas.width, canvas.height);
    engine.font = "30px Arial";
    engine.fillText('Mooie snor', 100, 100);
}