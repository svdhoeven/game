import MessageBus from '../MessageBus';
import * as Three from 'three';
import * as Event from '../../events/Event.js';

class Input {
    /**
     * Constructor
     */
    constructor(){
        this.keyStates = [new Map(), new Map()];
        this.buttonStates = [new Map(), new Map()];
        this.wheelState = new Three.Vector3()
        this.mouseState = [new Three.Vector2(), new Three.Vector2()];
        this.intersectEntities = [];

        document.addEventListener('keydown', this.onKeyDown.bind(this), false);
        document.addEventListener('keyup', this.onKeyUp.bind(this), false);
        document.addEventListener('mousemove', this.onMouseMove.bind(this), false);
        document.addEventListener('mousedown', this.onMouseDown.bind(this), false);
        document.addEventListener('mouseup', this.onMouseUp.bind(this), false);
        document.addEventListener('wheel', this.onMouseWheel.bind(this), false);
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
    }

    /**
     * Handle system messages
     * @param message
     */
    onMessage(message) {
        if (message instanceof Event.InputEvent) {
            if (message instanceof Event.MouseIntersectStartEvent) {
                this.intersectEntities.push(message.entity);
                MessageBus.send("bus", new Event.HoveredOverEntityStartEvent(message.entity));
            } else if (message instanceof Event.MouseIntersectStopEvent) {
                this.intersectEntities = this.intersectEntities.filter(function(entity) {
                   return entity != message.entity;
                });
                MessageBus.send("bus", new Event.HoveredOverEntityStopEvent(message.entity));
            } else if (message instanceof Event.MouseButtonPressedEvent) {
                this.intersectEntities.forEach(function (intersectEntity) {
                    MessageBus.send("bus", new Event.ClickedOnEntityEvent(intersectEntity));
                }, this);
            } else if (message instanceof Event.MouseButtonReleasedEvent) {

            }
        }

        if (message instanceof Event.SystemEvent) {
            if (message instanceof Event.SystemUpdateEvent) {
                for (let [key, state] of this.keyStates[0].entries()) {
                    if (this.keyStates[1].get(key) != state) {
                        if (state) {
                            MessageBus.send("bus", new Event.KeyDownEvent(null, null, null, null, key));
                        } else {
                            MessageBus.send("bus", new Event.KeyUpEvent(null, null, null, null, key));
                        }
                    }
                }
                this.keyStates[1] = new Map(this.keyStates[0]);

                for (let [button, state] of this.buttonStates[0].entries()) {
                    if (this.buttonStates[1].get(button) != state) {
                        if (state) {
                            MessageBus.send("bus", new Event.MouseButtonPressedEvent(button));
                        } else {
                            MessageBus.send("bus", new Event.MouseButtonReleasedEvent(button));
                        }
                    }
                }
                this.buttonStates[1] = new Map(this.buttonStates[0]);

                if (this.wheelState.x != 0 || this.wheelState.y != 0 || this.wheelState.z != 0) {
                    MessageBus.send("bus", new Event.MouseWheelEvent(this.wheelState));
                    this.wheelState = new Three.Vector3();
                }

                if (this.mouseState[0].x != this.mouseState[1].x || this.mouseState[0].y != this.mouseState[1].y) {
                    MessageBus.send("bus", new Event.MouseMoveEvent(this.mouseState[0]));
                }
                this.mouseState[1] = this.mouseState[0].clone();
            }
        }
    }

    /**
     * Handle key down events
     * @param event
     */
    onKeyDown(event) {
        "use strict";
        event.preventDefault();
        this.keyStates[0].set(event.key, true);
        //MessageBus.send("bus", new Event.KeyDownEvent(event.ctrlKey, event.altKey, event.shiftKey, event.metaKey, event.key));
    }

    /**
     * Handle key up events
     * @param event
     */
    onKeyUp(event) {
        "use strict";
        event.preventDefault();
        this.keyStates[0].set(event.key, false);
        //MessageBus.send("bus", new Event.KeyUpEvent(event.ctrlKey, event.altKey, event.shiftKey, event.metaKey, event.key));
    }

    /**
     * Handle mouse move events
     * @param event
     */
    onMouseMove(event) {
        "use strict";
        event.preventDefault();
        this.mouseState[0].x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouseState[0].y = - (event.clientY / window.innerHeight) * 2 + 1;
        //MessageBus.send("bus", new Event.MouseMoveEvent(new Three.Vector2((event.clientX / window.innerWidth) * 2 - 1,- (event.clientY / window.innerHeight) * 2 + 1)))
    }

    /**
     * Handle mouse down events
     * @param event
     */
    onMouseDown(event) {
        "use strict";
        event.preventDefault();
        this.buttonStates[0].set(event.button, true);
        //MessageBus.send("bus", new Event.MouseButtonPressedEvent(event.button));
    }

    /**
     * Handle mouse up events
     * @param event
     */
    onMouseUp(event) {
        "use strict";
        event.preventDefault();
        this.buttonStates[0].set(event.button, false);
        //MessageBus.send("bus", new Event.MouseButtonReleasedEvent(event.button));
    }

    /**
     * Handle mouse wheel events
     * @param event
     */
    onMouseWheel(event) {
        "use strict";
        event.preventDefault();
        this.wheelState.x = event.deltaX;
        this.wheelState.y = event.deltaY;
        this.wheelState.z = event.deltaZ;
        //MessageBus.send("bus", new Event.MouseWheelEvent(new Three.Vector3(event.deltaX, event.deltaY, event.deltaZ)));
    }

    /**
     * Resizes the window
     */
    onWindowResize() {
        "use strict";
        MessageBus.send("bus", new Event.WindowResizeEvent(window.innerWidth, window.innerHeight));
    }

}

export default Input;