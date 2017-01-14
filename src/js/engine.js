/** Imports */
//Libraries
import $ from 'jquery';
import jQuery from 'jquery';
import * as THREE from 'three';

//CoreObjects
import Map from './coreObjects/Map';

//GameObjects

/** Set global scope variables */
//Core variables
let renderer,
    scene,
    camera,
    map;

//GameObjects variables
let gameObjects;


//Call init when done loading (jQuery magic)
$(init);

/**
 * Initializes the Canvas object and starts the game loop
 *
 */
function init(){
    //Init ThreeJS todo put in Canvas class
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    //Append canvas element to body
    document.body.appendChild(renderer.domElement);

    //Set camera position
    camera.position.z = 5;

    //Init map
    map = new Map();

    //Append all tiles from map to scene
    map.tiles.forEach(function(tile){
        "use strict";

        scene.add(tile.mesh);
    });

    render();
}


function render(){
    "use strict";
    requestAnimationFrame(draw);

    update();

    draw();
}

/**
 * Update gameObjects
 */
function update(){
    "use strict";

}

/**
 * Draw gameObjects
 */
function draw(){
    "use strict";

    renderer.render(scene, camera);
}