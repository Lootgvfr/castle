import { Entity } from '../base/entity';

class Player extends Entity {
    type = 'player';

    constructor(
        {
            pos_x = 0,
            pos_y = 0
        }
    ) {
        super(
            {
                display_data: {
                    width: 10,
                    height: 30
                },
                pos_x: pos_x,
                pos_y: pos_y,
                velocity_x: 5
            }
        );
    }
}

export { Player };