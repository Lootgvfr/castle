import { Entity } from "./entity";

class Character extends Entity {
    constructor(
        {
            display_data = {},
            pos_x = 0,
            pos_y = 0,
        }
    ) {
        super(
            {
                display_data: display_data,
                pos_x: pos_x,
                pos_y: pos_y
            }
        );
    }
}

export { Character };