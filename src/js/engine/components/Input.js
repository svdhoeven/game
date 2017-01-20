import EventBus from 'eventbusjs';
import * as Three from 'three';
import * as Event from '../../events/Event.js'

class Input {
    /**
     * Constructor
     */
    constructor(){
        document.addEventListener( 'mousemove', this.onMouseMove.bind(this), false );
        document.addEventListener( 'mousedown', this.onMouseDown.bind(this), false );
        document.addEventListener( 'mouseup', this.onMouseUp.bind(this), false );
        window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
    }

    /**
     * Handle system events
     * @param event
     */
    onEvent(event) {

    }

    /**
     * Handle mouse move events
     * @param event
     */
    onMouseMove(event) {
        "use strict";
        event.preventDefault();
        EventBus.dispatch("bus", new Event.MouseMoveEvent(new Three.Vector2(
            (event.clientX / window.innerWidth) * 2 - 1,
            - (event.clientY / window.innerHeight) * 2 + 1)))
    }

    /**
     * Handle mouse down events
     * @param event
     */
    onMouseDown(event) {
        "use strict";
        event.preventDefault();
        EventBus.dispatch("bus", new Event.MouseButtonPressedEvent(event.button));
    }

    /**
     * Handle mouse up events
     * @param event
     */
    onMouseUp(event) {
        "use strict";
        event.preventDefault();
        EventBus.dispatch("bus", new Event.MouseButtonReleasedEvent(event.button));
    }

    /**
     * Resizes the window
     */
    onWindowResize() {
        "use strict";
        EventBus.dispatch("bus", new Event.WindowResizeEvent(window.innerWidth, window.innerHeight));
    }

}

export default Input;