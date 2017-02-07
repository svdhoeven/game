import EventBus from 'eventbusjs';

import Input from './components/Input.js';
import Render from './components/Render.js';

import * as Event from '../events/Event.js';

class Engine {
    /**
     * Constructor
     */
    constructor(){
        this.lastUpdateTs = Date.now();
        this.lastRenderTs = Date.now();

        this.input = new Input();
        this.render = new Render();

        this.ignoreEvents = [Event.SystemEvent, Event.CameraEvent];

        EventBus.addEventListener("bus", this.input.onEvent, this.input);
        EventBus.addEventListener("bus", this.render.onEvent, this.render);

        EventBus.addEventListener("bus", this.log, this);
    }

    start() {
        EventBus.dispatch("bus", new Event.SystemStartEvent());
    }

    stop() {
        EventBus.dispatch("bus", new Event.SystemStopEvent());
    }

    update() {
        let now = Date.now();
        EventBus.dispatch("bus", new Event.SystemUpdateEvent(now - this.lastUpdateTs));
        this.lastUpdateTs = now;
    }

    draw() {
        let now = Date.now();
        EventBus.dispatch("bus", new Event.SystemRenderEvent());
        this.lastRenderTs = now;
    }

    log(event) {
        let log = true;
        this.ignoreEvents.forEach(function(type) {
            if (event.target instanceof type) {
                log = false;
            }
        }, this);

        if (log) {
            console.debug("Name: " + event.target.constructor.name + ", Event: " + JSON.stringify(event.target));
        }
    }

}

export default Engine;