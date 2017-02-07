import MessageBus from '../MessageBus';
import * as Three from 'three';

import * as Event from '../../events/Event.js';

class Render {
    /**
     * Constructor
     */
    constructor(){
        this.scene = new Three.Scene();
        this.camera = new Three.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
        this.raycaster = new Three.Raycaster();
        this.position = new Three.Vector2();
        this.renderer = new Three.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.entities = [];
        this.intersectedEntities = [];
    }

    /**
     * Handle system messages
     * @param message
     */
    onMessage(message) {
        if (message instanceof Event.SystemRenderEvent) {
            this.renderer.render(this.scene, this.camera);
        } else if (message instanceof Event.WindowResizeEvent) {
            this.resize(message.width, message.height);
        } else if (message instanceof Event.AddSceneEvent) {
            this.entities.push.apply(this.entities, message.entities);
            this.scene.add.apply(this.scene, message.entities.map(function(entity) {
                return entity.mesh;
            }));
        } else if (message instanceof Event.RemoveSceneEvent) {
            message.entities.forEach(function(entity) {
                let index = this.entities.indexOf(entity);
                this.entities.splice(index, 1);
            }, this);
            this.scene.remove.apply(this.scene, message.entities.map(function(entity) {
                return entity.mesh;
            }));
        } else if (message instanceof Event.CameraMoveEvent) {
            this.camera.position.set(message.position.x, message.position.y, message.position.z);
        } else if (message instanceof Event.MouseMoveEvent) {
            this.position = message.position;
            this.checkIntersects();
        }
    }

    checkIntersects() {
        this.raycaster.setFromCamera(this.position, this.camera);
        let intersects = this.raycaster.intersectObjects(this.scene.children);
        let intersectedEntities = this.entities.filter(function(entity) {
            let isIntersected = false;
            intersects.forEach(function(intersect) {
                if (entity.mesh == intersect.object) {
                    isIntersected = true;
                }
            });
            return isIntersected;
        }, this);

        intersectedEntities.forEach(function(entity) {
            if (!this.intersectedEntities.includes(entity)) {
                MessageBus.send("bus", new Event.MouseIntersectStartEvent(entity));
            }
        }, this);
        this.intersectedEntities.forEach(function(entity) {
            if (!intersectedEntities.includes(entity)) {
                MessageBus.send("bus", new Event.MouseIntersectStopEvent(entity));
            }
        }, this);
        this.intersectedEntities = intersectedEntities;
    }

    resize(newWidth, newHeight) {
        this.camera.aspect = newWidth / newHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(newWidth, newHeight);
    }

}

export default Render;