import EventBus from 'eventbusjs';
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
        this.renderer = new Three.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.entities = [];
        this.intersectedEntities = [];

        this.camera.position.z = 5;
    }

    /**
     * Handle system events
     * @param event
     */
    onEvent(event) {
        if (event.target instanceof Event.SystemRenderEvent) {
            this.renderer.render(this.scene, this.camera);
        } else if (event.target instanceof Event.WindowResizeEvent) {
            this.resize(event.target.width, event.target.height);
        } else if (event.target instanceof Event.AddSceneEvent) {
            this.entities.push.apply(this.entities, event.target.entities);
            this.scene.add.apply(this.scene, event.target.entities.map(function(entity) {
                return entity.mesh;
            }));
        } else if (event.target instanceof Event.RemoveSceneEvent) {
            event.target.entities.forEach(function(entity) {
                let index = this.entities.indexOf(entity);
                this.entities.splice(index, 1);
            }, this);
            this.scene.remove.apply(this.scene, event.target.entities.map(function(entity) {
                return entity.mesh;
            }));
        } else if (event.target instanceof Event.CameraMoveEvent) {
            this.camera.position.set(event.target.position.x, event.target.position.y, event.target.position.z);
        } else if (event.target instanceof Event.MouseMoveEvent) {
            this.raycaster.setFromCamera(event.target.position, this.camera);
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
                    EventBus.dispatch("bus", new Event.MouseIntersectStartEvent(entity));
                }
            }, this);
            this.intersectedEntities.forEach(function(entity) {
               if (!intersectedEntities.includes(entity)) {
                   EventBus.dispatch("bus", new Event.MouseIntersectStopEvent(entity));
               }
            }, this);
            this.intersectedEntities = intersectedEntities;
        }
    }

    resize(newWidth, newHeight) {
        this.camera.aspect = newWidth / newHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(newWidth, newHeight);
    }

}

export default Render;