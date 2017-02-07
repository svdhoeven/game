import Entity from './../logic/Entity/Entity.js';

class Tile extends Entity{

    constructor(mesh){
        super(mesh);
    }

    highlight(highlight) {
        if (highlight) {
            this.mesh.material.color.set('lightgreen');
        } else {
            this.mesh.material.color.set("green");
        }
    }

    select(select) {
        if (select) {
            this.mesh.material.color.set('red');
        } else {
            this.mesh.material.color.set('green');
        }
    }
}

export default Tile;