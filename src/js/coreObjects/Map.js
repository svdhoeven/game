import Tile from './../gameObjects/Tile';
import AssetsManager from './AssetsManager';
import * as THREE from 'three';

class Map{
    constructor(width, height) {
        this.assetsManager = new AssetsManager();

        this.tiles = [];

        for (let x = 0; x < width; x++) {

            for (let y = 0; y < height; y++) {
                let mesh = this.assetsManager.createTile();
                mesh.position.set(x * 2, y * 2, 0);
                this.tiles.push(new Tile(mesh));
            }
        }
    }
}

export default Map;