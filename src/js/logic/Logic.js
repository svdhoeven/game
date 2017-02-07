import MessageBus from '../engine/MessageBus';

import GameLogic from './Game/GameLogic.js';
import PlayerLogic from './Player/PlayerLogic.js';

class Logic {
    constructor() {
        this.gameLogic = new GameLogic();
        this.playerLogic = new PlayerLogic();

        MessageBus.subscribe("bus", this.gameLogic.onMessage, this.gameLogic);
        MessageBus.subscribe("bus", this.playerLogic.onMessage, this.playerLogic);
    }
}

export default Logic;