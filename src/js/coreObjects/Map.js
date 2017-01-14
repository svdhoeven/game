import Tile from './../gameObjects/Tile';
import AssetsManager from './AssetsManager';

class Map{
    constructor() {
        this.assetsManager = new AssetsManager();

        this.tiles = [
            new Tile(this.assetsManager.meshes.field_flat),
            new Tile(this.assetsManager.meshes.field_flat),
        ];
    }
}

export default Map;