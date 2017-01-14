/** Imports */
//Libraries
import $ from 'jquery';
import jQuery from 'jquery';
import * as THREE from 'three';

//CoreObjects

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
    //Init ThreeJS todo put in Canvas class
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    //Append canvas element to body
    document.body.appendChild(renderer.domElement);

    let geometry = new THREE.BoxGeometry( 1, 1, 1 ),
        material = new THREE.MeshBasicMaterial({color: '#7a1ce3'}),
        cube = new THREE.Mesh(geometry, material),
        cube2 = new THREE.Mesh(geometry, material);

    scene.add(cube, cube2);
    camera.position.z = 5;

    var render = function () {
        requestAnimationFrame( render );

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        cube2.rotation.y -= 0.01;
        cube2.rotation.y -= 0.01;

        renderer.render(scene, camera);
    };

    render();
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