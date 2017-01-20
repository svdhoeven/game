/**
 * Base event
 */
class Event {

}

export {Event};

/**
 * System events
 */
class SystemEvent extends Event {

}

class SystemStartEvent extends SystemEvent {

}

class SystemStopEvent extends SystemEvent {
    constructor(performRestart) {
        super();
        this.performRestart = performRestart;
    }
}

class SystemRenderEvent extends SystemEvent {

}

class SystemUpdateEvent extends SystemEvent {
    constructor(elapsedTimeMs) {
        super();
        this.elapsedTimeMs = elapsedTimeMs;
    }
}

export {SystemEvent, SystemStartEvent, SystemStopEvent, SystemRenderEvent, SystemUpdateEvent};

/**
 * Game events
 */
class GameEvent extends Event {

}

class NewGameEvent extends GameEvent {

}

class RestartGameEvent extends GameEvent {

}

class QuitGameEvent extends GameEvent {

}

export {GameEvent, NewGameEvent, RestartGameEvent, QuitGameEvent}

/**
 * Window events
 */
class WindowEvent extends Event {

}

class WindowResizeEvent extends WindowEvent {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }
}

export {WindowEvent, WindowResizeEvent};

/**
 * Input events
 */
class MouseEvent extends Event {

}

class MouseButtonEvent extends MouseEvent {
    constructor(button) {
        super();
        this.button = button;
    }
}

class MouseButtonReleasedEvent extends MouseButtonEvent {
    constructor(button) {
        super(button);
    }
}

class MouseButtonPressedEvent extends MouseButtonEvent {
    constructor(button) {
        super(button);
    }
}

class MouseMoveEvent extends MouseEvent {
    constructor(position) {
        super();
        this.position = position;
    }
}

export {MouseEvent, MouseButtonEvent, MouseButtonPressedEvent, MouseButtonReleasedEvent, MouseMoveEvent}