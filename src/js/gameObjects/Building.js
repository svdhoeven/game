import Entity from './../logic/Entity/Entity.js';

class Building extends Entity{

    constructor(mesh){
        super(mesh);
    }

    highlight(highlight) {
        if (highlight) {
            this.mesh.material.color.set('red');
        } else {
            this.mesh.material.color.set('blue');
        }
    }

    select(select) {
        if (select) {
            this.mesh.material.color.set('red');
        } else {
            this.mesh.material.color.set('blue');
        }
    }
}

export default Building;