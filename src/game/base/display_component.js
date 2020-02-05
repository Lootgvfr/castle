import { canvases, canvas_scale } from "../main";

class DisplayData {
    is_displayed; // should the element be drawn
    canvas_slug; // slug of the canvas to be drawn on

    // possible values of display_type:
    // - rectangle
    display_type;

    filled; // should the figure be filled
    color; // color of the figure
    width; // width of the rectangle
    height; // height of the rectangle

    constructor(
        {
            is_displayed = true,
            canvas_slug = 'main',
            display_type = 'rectangle',
            filled = true,
            color = 'black',
            width = 0,
            height = 0
        }
    ) {
        this.is_displayed = is_displayed;
        this.canvas_slug = canvas_slug;
        this.display_type = display_type;
        this.filled = filled;
        this.color = color;
        this.width = width;
        this.height = height;
    }

    draw (pos_x, pos_y) {
        if (this.is_displayed) {
            const ctx = canvases[this.canvas_slug].context;

            if (this.display_type === 'rectangle') {

                if (this.filled) {
                    ctx.fillStyle = this.color;
                    ctx.fillRect(
                        scale_coordinate(pos_x),
                        scale_coordinate(pos_y),
                        scale_coordinate(this.width),
                        scale_coordinate(this.height)
                    );
                } else {
                    ctx.strokeStyle = this.color;
                    ctx.beginPath();
                    ctx.rect(
                        scale_coordinate(pos_x),
                        scale_coordinate(pos_y),
                        scale_coordinate(this.width),
                        scale_coordinate(this.height)
                    );
                    ctx.stroke();
                }
            }
        }
    }
}

function scale_coordinate (coord) {
    /* Returns value of the coordinate scaled to the canvas size */
    return coord * canvas_scale;
}

export { DisplayData, scale_coordinate };