import EventBus from 'eventbusjs';

import Tile from '../../gameObjects/Tile';
import MapFactory from '../Map/MapFactory';
import * as Event from '../../events/Event.js'

class GameLogic {
    constructor() {
        this.mapFactory = new MapFactory();
    }

    newGame(seed) {
        let map = this.mapFactory.generateMap(seed);
        EventBus.dispatch("bus", new Event.AddSceneEvent(map.tiles));
    }

    onEvent(event) {
        if (event.target instanceof Event.SystemStartEvent) {
            let seed = Math.random();
            this.newGame(seed);
            EventBus.dispatch("bus", new Event.NewGameEvent());
        }

        if (event.target instanceof Event.HoveredOverEntityStartEvent) {
            if (event.target.entity instanceof Tile) {
                event.target.entity.highlight(true);
            }
        } else if (event.target instanceof Event.HoveredOverEntityStopEvent) {
            if (event.target.entity instanceof Tile) {
                event.target.entity.highlight(false);
            }
        }

        if (event.target instanceof Event.ClickedOnEntityEvent) {
            if (event.target.entity instanceof Tile) {
                event.target.entity.select(true);
            }
        } else if (event.target instanceof Event.ClickedOnEntityEvent) {
            if (event.target.entity instanceof Tile) {
                event.target.entity.select(false);
            }
        }
    }
}

export default GameLogic;