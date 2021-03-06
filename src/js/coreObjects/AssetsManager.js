import * as THREE from 'three';

class AssetsManager{
    /**
     * Constructor
     */
    constructor(){
        this.geometries = {
            cube: new THREE.BoxGeometry(1, 1, 1)
        };

        this.materials = {
            grass: new THREE.MeshBasicMaterial({color: 'green'}),
            dirt: new THREE.MeshBasicMaterial({color: 'brown'})
        };

        this.meshes = {
            field_flat: new THREE.Mesh(this.geometries.cube, this.materials.grass)
        }
    }

    createTile() {
        return new THREE.Mesh(this.geometries.cube.clone(), this.materials.grass.clone());
    }
}

export default AssetsManager;