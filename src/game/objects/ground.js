import { ObjectEntity } from "../base/object";

class Ground extends ObjectEntity {
    type = 'ground';

    constructor(
        {
            pos_x = 0,
            pos_y = 0,
            width = 0,
            height = 0
        }
    ) {
        super(
            {
                display_data: [{
                    width: width,
                    height: height,
                    color: 'black',
                    canvas_slug: 'static'
                }],
                collision_boxes: [{
                    width: width,
                    height: height
                }],
                pos_x: pos_x,
                pos_y: pos_y
            }
        );
    }
}

export { Ground };