import EventBus from 'eventbusjs';

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
        EventBus.dispatch("bus", new Event.AddSceneEvent(this.game.map.tiles));
    }

    onEvent(event) {
        if (event.target instanceof Event.SystemStartEvent) {
            let seed = Math.random();
            this.newGame(seed);
            EventBus.dispatch("bus", new Event.NewGameEvent());
        }

        if (event.target instanceof Event.HoveredOverEntityStartEvent) {
            event.target.entity.highlight(true);
        } else if (event.target instanceof Event.HoveredOverEntityStopEvent) {
            event.target.entity.highlight(false);
        }

        if (event.target instanceof Event.ClickedOnEntityEvent) {
            if (event.target.entity instanceof Tile) {
                if (!event.target.entity.building) {
                    event.target.entity.select(true);
                    let building = new Building(new Three.Mesh(new Three.BoxGeometry(1, 1, 2), new Three.MeshBasicMaterial({color: 'blue'})));
                    this.game.map.place(event.target.entity, building);
                    EventBus.dispatch("bus", new Event.AddSceneEvent([building]));
                } else {
                    EventBus.dispatch("bus", new Event.RemoveSceneEvent([event.target.entity.building]));
                    event.target.entity.building = null;
                }
            }
        }
    }
}

export default GameLogic;