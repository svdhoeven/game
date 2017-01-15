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
let loop,
    lastUpdateTs,
    renderer,
    scene,
    camera,
    map,
    mouse,
    raycaster;

//GameObjects variables
let gameObjects;


//Call init when done loading (jQuery magic)
$(init);

/**
 * Initializes the Canvas object and starts the game loop
 *
 */
function init(){
    loop = 0;
    lastUpdateTs = Date.now();

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
    map = new Map(16, 16);

    raycaster = new THREE.Raycaster();
    mouse = THREE.Vector2();
    //document.addEventListener( 'mousemove', onMouseMove, false );
    //window.addEventListener( 'resize', onWindowResize, false );

    //Append all tiles from map to scene
    map.tiles.forEach(function(tile){
        "use strict";

        scene.add(tile.mesh);
    });

    render();
}


function render(){
    "use strict";
    requestAnimationFrame(render);

    let ts0 = Date.now();
    update(ts0 - lastUpdateTs);
    lastUpdateTs = ts0;
    let ts1 = Date.now();
    draw();
    let ts2 = Date.now();

    console.log("Loop: " + loop++ + " Update time: " + (ts1 - ts0) + "ms , Draw time: " + (ts2 - ts1) + "ms");
}

/**
 * Handle mouse events
 * @param event
 */
function onMouseMove(event) {
    "use strict";
    event.preventDefault();
    mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        - (event.clientY / window.innerHeight) * 2 + 1);
}

/**
 * Resizes the window
 */
function onWindowResize() {
    "use strict";
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

/**
 * Update gameObjects
 */
function update(elapsedTimeMs){
    "use strict";

    // update the picking ray with the camera and mouse position
    //raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    // var intersects = raycaster.intersectObjects(scene.children);
    //
    // for (let i = 0; i < intersects.length; i++) {
    //     intersects[i].object.material.color.set( 0xff0000 );
    // }
}

/**
 * Draw gameObjects
 */
function draw(){
    "use strict";

    renderer.render(scene, camera);
}