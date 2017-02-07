import Tile from '../../gameObjects/Tile';
import * as THREE from 'three';

class Map {
    constructor(width, height) {
        this.tiles = [];

        for (let x = 0; x < width; x++) {

            for (let y = 0; y < height; y++) {
                let mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 0), new THREE.MeshBasicMaterial({color: "green"}));
                mesh.position.set(x, y, 0);
                this.tiles.push(new Tile(mesh));
            }
        }
    }
}

export default Map;