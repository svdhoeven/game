class Canvas{
    constructor(){
        this.width = 1000;
        this.height = 1000;

        this.$el = $("<canvas width='" + this.width +
            "' height='" + this.height + "'></canvas>").css({
            width: this.width,
            height: this.height,
        });
    }
}

export default Canvas;