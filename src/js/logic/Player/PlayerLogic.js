import MessageBus from '../../engine/MessageBus';
import * as Three from 'three';

import Player from './Player.js'
import * as PlayerAction from './PlayerAction.js'

import * as Event from '../../events/Event.js'

class PlayerLogic {
    constructor() {
        this.player = new Player();
    }

    onMessage(message) {
        if (message instanceof Event.KeyDownEvent) {
            switch(message.key) {
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
        } else if (message instanceof Event.KeyUpEvent) {
            switch (message.key) {
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
        } else if (message instanceof Event.MouseWheelEvent) {
            this.player.position.z = this.player.position.z + message.movement.y;
        } else if (message instanceof Event.ClickedOnEntityEvent) {
            switch(this.player.action) {
                case PlayerAction.NONE:
                    break;
                case PlayerAction.SELECT:
                    MessageBus.send("bus", new Event.PlayerSelectEvent(message.entity));
                    break;
                case PlayerAction.PLACE:
                    MessageBus.send("bus", new Event.PlayerPlaceEvent(message.entity));
                    break;
            }
        }

        if (message instanceof Event.SystemUpdateEvent) {
            this.player.position.add(this.player.velocity);
            MessageBus.send("bus", new Event.CameraMoveEvent(this.player.position));
        }
    }
}

export default PlayerLogic;