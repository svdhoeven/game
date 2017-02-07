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

class SystemStatisticsEvent extends SystemEvent {
    constructor(periodMs, averageRenderTimeMs, averageUpdateTimeMs) {
        super();
        this.periodMs = periodMs;
        this.averageRenderTimeMs = averageRenderTimeMs;
        this.averageUpdateTimeMs = averageUpdateTimeMs;
    }
}

export {SystemEvent, SystemStartEvent, SystemStopEvent, SystemRenderEvent, SystemUpdateEvent, SystemStatisticsEvent};

/**
 * Game events
 */
class GameEvent extends Event {

}

class NewGameEvent extends GameEvent {

}

class ContinueGameEvent extends GameEvent {

}

class RestartGameEvent extends GameEvent {

}

class QuitGameEvent extends GameEvent {

}

export {GameEvent, NewGameEvent, ContinueGameEvent, RestartGameEvent, QuitGameEvent}

/**
 * Scene events
 */
class SceneEvent extends Event {
    constructor(entities) {
        super();
        this.entities = entities;
    }
}

class AddSceneEvent extends SceneEvent {

}

class RemoveSceneEvent extends SceneEvent {

}

export {SceneEvent, AddSceneEvent, RemoveSceneEvent}


/**
 * Camera events
 */
class CameraEvent extends Event {

}

class CameraMoveEvent extends CameraEvent {
    constructor(position) {
        super();
        this.position = position;
    }
}

class CameraLookAtEvent extends CameraEvent {
    constructor(position) {
        super();
        this.position = position;
    }
}

export {CameraEvent, CameraMoveEvent, CameraLookAtEvent}

/**
 * Player events
 */
class PlayerEvent extends Event {

}

class PlayerMoveEvent extends PlayerEvent {
    constructor(movement) {
        super();
        this.movement = movement;
    }
}

class PlayerSelectEvent extends PlayerEvent {

}

export {PlayerEvent, PlayerMoveEvent, PlayerSelectEvent}

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

class InputEvent extends Event {

}

class KeyEvent extends InputEvent {
    constructor(ctrl, alt, shift, meta, key) {
        super();
        this.ctrl = ctrl;
        this.alt = alt;
        this.shift = shift;
        this.meta = meta;
        this.key = key;
    }
}

class KeyDownEvent extends KeyEvent {

}

class KeyUpEvent extends KeyEvent {

}

class MouseEvent extends InputEvent {

}

class MouseButtonEvent extends MouseEvent {
    constructor(button) {
        super();
        this.button = button;
    }
}

class MouseButtonReleasedEvent extends MouseButtonEvent {

}

class MouseButtonPressedEvent extends MouseButtonEvent {

}

class MouseMoveEvent extends MouseEvent {
    constructor(position) {
        super();
        this.position = position;
    }
}

class MouseWheelEvent extends MouseEvent {
    constructor(movement) {
        super();
        this.movement = movement;
    }
}

class MouseIntersectEvent extends MouseEvent {
    constructor(entity) {
        super();
        this.entity = entity;
    }
}

class MouseIntersectStartEvent extends MouseIntersectEvent {

}

class MouseIntersectStopEvent extends MouseIntersectEvent {

}

export {InputEvent, KeyEvent, KeyDownEvent, KeyUpEvent, MouseEvent, MouseButtonEvent, MouseButtonPressedEvent, MouseButtonReleasedEvent, MouseMoveEvent, MouseWheelEvent, MouseIntersectEvent, MouseIntersectStartEvent, MouseIntersectStopEvent}

/**
 * Entity interaction events
 */
class EntityInteractionEvent extends Event {
    constructor(entity) {
        super();
        this.entity = entity;
    }
}

class ClickedOnEntityEvent extends EntityInteractionEvent {

}

class HoveredOverEntityStartEvent extends EntityInteractionEvent {

}

class HoveredOverEntityStopEvent extends EntityInteractionEvent {

}

export {EntityInteractionEvent, ClickedOnEntityEvent, HoveredOverEntityStartEvent, HoveredOverEntityStopEvent}