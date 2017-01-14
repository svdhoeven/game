/** Imports */
//Libraries
import $ from 'jquery';
import jQuery from 'jquery';
import * as THREE from 'three';

//CoreObjects
import Canvas from './coreObjects/Canvas';

//GameObjects

/** Set global scope variables */
//Core variables
let renderer,
    scene,
    camera,
    fps = 60;

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
    //canvas = new Canvas();
    //canvas.$el.appendTo('main');

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

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
    "use strict";
    renderer.render(scene, camera);
}