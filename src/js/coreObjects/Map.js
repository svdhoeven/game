import Tile from './../gameObjects/Tile';
import AssetsManager from './AssetsManager';
import * as THREE from 'three';

class Map{
    constructor(width, length) {
        this.assetsManager = new AssetsManager();

        this.tiles = [];

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < length; y++) {
                let mesh = this.assetsManager.meshes.field_flat.clone();
                mesh.position.set(x, y, 0);
                this.tiles.push(new Tile(mesh));
            }
        }
    }
}

export default Map;