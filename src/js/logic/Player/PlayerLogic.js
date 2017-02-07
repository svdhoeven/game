import EventBus from 'eventbusjs';

import * as Three from 'three';

import Player from './Player.js'
import * as PlayerAction from './PlayerAction.js'

import * as Event from '../../events/Event.js'

class PlayerLogic {
    constructor() {
        this.player = new Player();
    }

    onEvent(event) {

        if (event.target instanceof Event.KeyDownEvent) {
            switch(event.target.key) {
                case "w":
                    this.player.velocity.y = this.player.velocity.y + 1;
                    break;
                case "s":
                    this.player.velocity.y = this.player.velocity.y - 1;
                    break;
                case "a":
                    this.player.velocity.x = this.player.velocity.x - 1;
                    break;
                case "d":
                    this.player.velocity.x = this.player.velocity.x + 1;
                    break;
            }
        } else if (event.target instanceof Event.KeyUpEvent) {
            switch (event.target.key) {
                case "w":
                    this.player.velocity.y = this.player.velocity.y - 1;
                    break;
                case "s":
                    this.player.velocity.y = this.player.velocity.y + 1;
                    break;
                case "a":
                    this.player.velocity.x = this.player.velocity.x + 1;
                    break;
                case "d":
                    this.player.velocity.x = this.player.velocity.x - 1;
                    break;
            }
        } else if (event.target instanceof Event.MouseWheelEvent) {
            this.player.position.z = this.player.position.z + event.target.movement.y;
        } else if (event.target instanceof Event.ClickedOnEntityEvent) {
            switch(this.player.action) {
                case PlayerAction.NONE:
                    break;
                case PlayerAction.SELECT:
                    EventBus.dispatch("bus", new Event.PlayerSelectEvent(event.target.entity));
                    break;
                case PlayerAction.PLACE:
                    break;
            }
        }

        if (event.target instanceof Event.SystemUpdateEvent) {
            this.player.position.add(this.player.velocity);
            EventBus.dispatch("bus", new Event.CameraMoveEvent(this.player.position));
        }
    }
}

export default PlayerLogic;