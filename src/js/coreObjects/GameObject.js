/**
 * Base for all objects in the game
 */
class GameObject{
    /**
     * Constructor
     *
     * @param mesh
     */
    constructor(mesh){
        this.mesh = mesh;
    }

    /**
     * Update function, for all logic
     */
    update(){}
}

export default GameObject;