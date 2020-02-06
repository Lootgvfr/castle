import { Entity } from "../base/entity";

class Ground extends Entity {
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
                display_data: {
                    width: width,
                    height: height,
                    color: 'black',
                    canvas_slug: 'static'
                },
                pos_x: pos_x,
                pos_y: pos_y
            }
        );
    }

    update(game_state, game_clock_time, collisions) {}
}

export { Ground };