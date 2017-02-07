
import * as Three from 'three';

import * as PlayerAction from './PlayerAction.js'

class Player {
    constructor() {
        this.position = new Three.Vector3();
        this.velocity = new Three.Vector3();
        this.action = PlayerAction.SELECT;
    }
}

export default Player;