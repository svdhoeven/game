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

    /**
     * Event handler functions
     */
    onMouseHoverStart(){}
    onMouseHoverEnd(){}
    onMouseDown(){}
    onMouseUp(){}
}

export default GameObject;