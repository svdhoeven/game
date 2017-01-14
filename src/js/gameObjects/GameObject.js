/**
 * Base for all objects in the game
 */
class GameObject{
    //Fields
    x = 0;
    y = 0;
    z = 0;

    /**
     * Constructor
     *
     * @param x
     * @param y
     * @param z
     */
    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * Update function, for all logic
     */
    update(){

    }

    /**
     * Draw function, for rendering
     */
    draw(){

    }
}

export default GameObject;