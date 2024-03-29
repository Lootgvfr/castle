import { Entity } from "./entity";

class ObjectEntity extends Entity {
    constructor(
        {
            display_data = [],
            collision_boxes = [],
            pos_x = 0,
            pos_y = 0
        }
    ) {
        super(
            {
                display_data: display_data,
                collision_boxes: collision_boxes,
                pos_x: pos_x,
                pos_y: pos_y
            }
        );
    }
}

export { ObjectEntity };