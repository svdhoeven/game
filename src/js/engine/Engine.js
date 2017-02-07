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
        this.lastStatisticsTs = Date.now();
        this.updateDuration = [];
        this.renderDuration = [];

        this.input = new Input();
        this.render = new Render();

        this.ignoreEvents = [Event.SystemUpdateEvent, Event.SystemRenderEvent, Event.CameraEvent];

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
        this.updateDuration.push(Date.now() - now);
        this.lastUpdateTs = now;
    }

    draw() {
        let now = Date.now();
        EventBus.dispatch("bus", new Event.SystemRenderEvent());
        this.renderDuration.push(Date.now() - now);
        this.lastRenderTs = now;
    }

    statistics() {
        let now = Date.now();
        if (now - this.lastStatisticsTs > 10000) {
            let averageRenderTimeMs = this.renderDuration.reduce(function(a, b) {
                return a + b;
            }, 0) / this.renderDuration.length;
            let averageUpdateTimeMs = this.updateDuration.reduce(function(a, b) {
                    return a + b;
                }, 0) / this.updateDuration.length;
            EventBus.dispatch("bus", new Event.SystemStatisticsEvent(10000, averageRenderTimeMs, averageUpdateTimeMs));
            this.renderDuration = [];
            this.updateDuration = [];
            this.lastStatisticsTs = now;
        }
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