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
let gameObjects = [];
let selectedGameObject = null;


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
    map = new Map(1, 1);

    raycaster = new THREE.Raycaster();
    mouse = {position: new THREE.Vector2(), state: [false], previousState: [false]};
    document.addEventListener( 'mousemove', onMouseMove, false );
    document.addEventListener( 'mousedown', onMouseDown, false );
    document.addEventListener( 'mouseup', onMouseUp, false );
    window.addEventListener( 'resize', onWindowResize, false );

    //Append all tiles from map to scene
    map.tiles.forEach(function(tile){
        "use strict";

        scene.add(tile.mesh);
        gameObjects.push(tile);
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

    //console.debug("Loop: " + loop++ + " Update time: " + (ts1 - ts0) + "ms , Draw time: " + (ts2 - ts1) + "ms");
}

/**
 * Handle mouse move events
 * @param event
 */
function onMouseMove(event) {
    "use strict";
    event.preventDefault();

    mouse.position = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        - (event.clientY / window.innerHeight) * 2 + 1);
    //console.debug("Moved mouse to X: " + mouse.position.x + " Y: " + mouse.position.y);
}

/**
 * Handle mouse down events
 * @param event
 */
function onMouseDown(event) {
    "use strict";
    event.preventDefault();

    mouse.state[event.button] = true;
    console.debug("Mouse button " + event.button + " pressed" );
}

/**
 * Handle mouse up events
 * @param event
 */
function onMouseUp(event) {
    "use strict";
    event.preventDefault();
    mouse.state[event.button] = false;
    console.debug("Mouse button " + event.button + " released" );
}

/**
 * Resizes the window
 */
function onWindowResize() {
    "use strict";
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    console.debug("Resized window Width: " + window.innerWidth + " Height: " + window.innerHeight);
}

/**
 * Update gameObjects
 */
function update(elapsedTimeMs){
    "use strict";

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse.position, camera);

    //calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(scene.children);

    // Matches objects based on mesh UUID
    if (intersects.length > 0) {
        intersects.forEach(function(intersect) {
           gameObjects.forEach(function(gameObject) {
               if (gameObject.mesh.uuid == intersect.object.uuid) {
                   if (selectedGameObject == null) {
                       // Mouse cursor moved to an object
                       gameObject.onMouseHoverStart();
                   } else if (selectedGameObject.mesh.uuid != gameObject.mesh.uuid) {
                       // Mouse cursor moved to a different object
                        selectedGameObject.onMouseHoverEnd();
                        gameObject.onMouseHoverStart();
                   } else {
                       // Mouse cursor points at the same object
                   }

                   selectedGameObject = gameObject;
               }
           });
        });
    } else {
        if (selectedGameObject != null) {
            // Mouse cursor moved from an object to empty space
            selectedGameObject.onMouseHoverEnd();
            selectedGameObject = null;
        }
    }

    // Compare the current mouse state against the previous to determine mouse events
    for(let i = 0; i < mouse.state.length; i++) {
        if (mouse.state[i] != mouse.previousState[i]) {
            if (mouse.state[i]) {
                // Mouse button i pressed
                if (selectedGameObject != null) {
                    selectedGameObject.onMouseDown();
                }
            } else {
                // Mouse button i released
                if (selectedGameObject != null) {
                    selectedGameObject.onMouseUp();
                }
            }
        }
    }

    mouse.previousState = mouse.state.slice(0);
}

/**
 * Draw gameObjects
 */
function draw(){
    "use strict";

    renderer.render(scene, camera);
}