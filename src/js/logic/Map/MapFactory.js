import Map from './Map.js'

class MapFactory {
    constructor() {

    }

    generateMap(seed) {
        return new Map(32, 32);
    }
}

export default MapFactory;