/**
 * Base for all objects in the game
 */
class Entity {
    /**
     * Constructor
     *
     * @param mesh
     */
    constructor(mesh){
        this.mesh = mesh;
    }

    toJSON() {
        return this.constructor.name;
    }
}

export default Entity;