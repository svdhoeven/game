import GameObject from './../coreObjects/GameObject';

class Tile extends GameObject{

    constructor(geometry){
        super(geometry);
    }

    onMouseHoverStart() {
        console.log("Starting hovering over tile");
    }

    onMouseHoverEnd() {
        console.log("Stopped hovering over tile");
    }
}

export default Tile;