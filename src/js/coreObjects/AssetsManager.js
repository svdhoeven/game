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
            grass: new THREE.MeshBasicMaterial({color: 'green'})
        };

        this.meshes = {
            field_flat: new THREE.Mesh(this.geometries.cube, this.materials.grass)
        }
    }
}

export default AssetsManager;