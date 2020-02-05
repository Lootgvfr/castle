import { DisplayData } from "./display_component";
import { CONSTANTS } from "../config/constants";

class Entity {
    // Entity type. Possible values:
    // - player
    type;

    display_data; // DisplayData instance
    pos_x; // X axis position
    pos_y; // Y axis position
    vel_x; // X axis velocity
    vel_y; // Y axis velocity

    constructor(
        {
            display_data = {},
            pos_x = 0,
            pos_y = 0,
            velocity_x = 0,
            velocity_y = 0
        }
    ) {
        this.display_data = new DisplayData(display_data);
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.vel_x = velocity_x;
        this.vel_y = velocity_y;
    }

    update (game_state, game_clock_time, collisions) {
        /* Update entity state for the next step */
        this.update_position();
    }

    update_position () {
        /* Update position of the entity */
        this.pos_x += this.vel_x;
        this.pos_y += this.vel_y;
        if (this.pos_x > CONSTANTS.width) {
            this.pos_x = 0;
        }
    }

    draw () {
        /* Draw entity on the canvas */
        this.display_data.draw(this.pos_x, this.pos_y);
    }
}

export { Entity };