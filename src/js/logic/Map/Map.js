import Tile from '../../gameObjects/Tile';
import * as Three from 'three';

class Map {
    constructor(width, height) {
        this.tiles = [];

        for (let x = 0; x < width; x++) {

            for (let y = 0; y < height; y++) {
                let mesh = new Three.Mesh(new Three.BoxGeometry(1, 1, 0), new Three.MeshBasicMaterial({color: "green"}));
                mesh.position.set(x, y, 0);
                this.tiles.push(new Tile(mesh));
            }
        }
    }

    place(tile, entity) {
        tile.building = entity;
        entity.mesh.position.setX(tile.mesh.position.x);
        entity.mesh.position.setY(tile.mesh.position.y);
        entity.mesh.position.setZ(tile.mesh.position.z);
    }

    clear(tile) {
        tile.building = null;
    }
}

export default Map;