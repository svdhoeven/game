import MessageBus from '../../engine/MessageBus';

import Game from './Game'
import Tile from '../../gameObjects/Tile';
import Building from '../../gameObjects/Building';
import MapFactory from '../Map/MapFactory';
import * as Event from '../../events/Event.js'
import * as Three from 'three';

class GameLogic {
    constructor() {
        this.mapFactory = new MapFactory();
    }

    newGame(seed) {
        this.game = new Game(this.mapFactory.generateMap(seed));
        MessageBus.send("bus", new Event.AddSceneEvent(this.game.map.tiles));
    }

    onMessage(message) {
        if (message instanceof Event.SystemStartEvent) {
            let seed = Math.random();
            this.newGame(seed);
            MessageBus.send("bus", new Event.NewGameEvent());
        }

        if (message instanceof Event.HoveredOverEntityStartEvent) {
            message.entity.highlight(true);
        } else if (message instanceof Event.HoveredOverEntityStopEvent) {
            message.entity.highlight(false);
        }

        if (message instanceof Event.ClickedOnEntityEvent) {
            if (message.entity instanceof Tile) {
                let tile = message.entity;
                if (!tile.building) {
                    tile.select(true);
                    let building = new Building(new Three.Mesh(new Three.BoxGeometry(1, 1, 2), new Three.MeshBasicMaterial({color: 'blue'})));
                    this.game.map.place(tile, building);
                    MessageBus.send("bus", new Event.AddSceneEvent([building]));
                } else {
                    MessageBus.send("bus", new Event.RemoveSceneEvent([tile.building]));
                    this.game.map.clear(tile);
                }
            }
        }
    }
}

export default GameLogic;