import { ObjectEntity } from "../base/object";

class LevelTransition extends ObjectEntity {
    type = 'level_transition';
    next_level = ''; // next level to be loaded after this transition
    require_interact = false; // is interact button required to transition to next level

    constructor(
        {
            pos_x = 0,
            pos_y = 0,
            width = 0,
            height = 0,
            next_level = 'level_1',
            require_interact = true
        }
    ) {
        super(
            {
                display_data: [{
                    width: width,
                    height: height,
                    color: 'green',
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
        this.next_level = next_level;
        this.require_interact = require_interact;
    }
}

export { LevelTransition };