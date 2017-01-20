import EventBus from 'eventbusjs';
import GUI from 'dat.gui';

import * as Event from '../events/Event.js'

class Logic {
    constructor() {
        EventBus.addEventListener("bus", this.onEvent, this);
    }

    onEvent(event) {
        if (event instanceof Event.SystemStartEvent) {
            let gui = new GUI();
            let options = function() {
                this.new = function() {};
                this.continue = function() {};
                this.quit = function() {};
            }
            gui.add(options, 'new');
            gui.add(options, 'continue');
            gui.add(options, 'quit');
        }
    }
}

export default Logic;