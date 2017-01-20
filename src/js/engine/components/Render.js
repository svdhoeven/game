import * as Three from 'three';

import * as Event from '../../events/Event.js';

class Render {
    /**
     * Constructor
     */
    constructor(){
        this.scene = new Three.Scene();
        this.camera = new Three.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
        this.renderer = new Three.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.camera.position.z = 5;
    }

    /**
     * Handle system events
     * @param event
     */
    onEvent(event) {
        if (event instanceof Event.SystemRenderEvent) {
            this.renderer.render(this.scene, this.camera);
        } else if (event instanceof Event.WindowResizeEvent) {
            this.resize(event.width, event.height);
        }
    }

    resize(newWidth, newHeight) {
        this.camera.aspect = newWidth / newHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(newWidth, newHeight);
    }

}

export default Render;