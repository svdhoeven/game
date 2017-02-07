import EventBus from 'eventbusjs';
import MessageBus from './MessageBus';

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

        this.ignoreMessages = [];//[Event.SystemUpdateEvent, Event.SystemRenderEvent, Event.CameraEvent];

        MessageBus.subscribe("bus", this.input.onMessage, this.input);
        MessageBus.subscribe("bus", this.render.onMessage, this.render);

        MessageBus.subscribe("bus", this.log, this);
    }

    start() {
        MessageBus.send("bus", new Event.SystemStartEvent());
    }

    stop() {
        MessageBus.send("bus", new Event.SystemStopEvent());
    }

    update() {
        let now = Date.now();
        MessageBus.send("bus", new Event.SystemUpdateEvent(now - this.lastUpdateTs));
        this.updateDuration.push(Date.now() - now);
        this.lastUpdateTs = now;
    }

    draw() {
        let now = Date.now();
        MessageBus.send("bus", new Event.SystemRenderEvent());
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
            MessageBus.send("bus", new Event.SystemStatisticsEvent(10000, averageRenderTimeMs, averageUpdateTimeMs));
            this.renderDuration = [];
            this.updateDuration = [];
            this.lastStatisticsTs = now;
        }
    }

    log(message) {
        let log = true;
        this.ignoreMessages.forEach(function(type) {
            if (message instanceof type) {
                log = false;
            }
        }, this);

        if (log) {
            console.debug("Name: " + message.constructor.name + ", Event: " + JSON.stringify(message));
        }
    }
}

export default Engine;