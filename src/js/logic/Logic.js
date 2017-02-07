import EventBus from 'eventbusjs';

import GameLogic from './Game/GameLogic.js';
import PlayerLogic from './Player/PlayerLogic.js';

class Logic {
    constructor() {
        this.gameLogic = new GameLogic();
        this.playerLogic = new PlayerLogic();

        EventBus.addEventListener("bus", this.gameLogic.onEvent, this.gameLogic);
        EventBus.addEventListener("bus", this.playerLogic.onEvent, this.playerLogic);
    }
}

export default Logic;