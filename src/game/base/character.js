import { Entity } from "./entity";
import {CONSTANTS} from "../config/constants";

class Character extends Entity {
    apply_gravity = true;
    in_air = true;

    constructor(
        {
            display_data = [],
            collision_boxes = [],
            pos_x = 0,
            pos_y = 0,
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

    process_collisions (collisions) {
        this.in_air = true;
        this.max_vel_x = Infinity;
        this.max_vel_y = Infinity;
        this.min_vel_x = -Infinity;
        this.min_vel_y = -Infinity;

        collisions.forEach((collision) => {
            console.log(`character of type ${this.type} ${this.id} collided with ${collision.other_object.type} ${collision.other_object.id} on side ${collision.details.side} with distance ${collision.details.distance}!`);

            if (collision.other_object.type === 'ground') {
                if (collision.details.distance <= 0.1) {
                    // full collision
                    if (collision.details.side === 'left') {
                        this.input_vel_x = Math.max(0, this.input_vel_x);
                    } else if (collision.details.side === 'right') {
                        this.input_vel_x = Math.min(0, this.input_vel_x);
                    } else if (collision.details.side === 'top') {
                        this.vel_y = Math.min(0, this.vel_y);
                    } else if (collision.details.side === 'bottom') {
                        this.vel_y = Math.max(0, this.vel_y);
                        this.in_air = false;
                    }
                } else {
                    // collision on the next frame
                    if (collision.details.side === 'left') {
                        this.min_vel_x = (-collision.details.distance - 0.01) * CONSTANTS.updates_per_second;
                    } else if (collision.details.side === 'right') {
                        this.max_vel_x = (collision.details.distance + 0.01) * CONSTANTS.updates_per_second;
                    } else if (collision.details.side === 'top') {
                        this.max_vel_y = (collision.details.distance - 0.01) * CONSTANTS.updates_per_second;
                    } else if (collision.details.side === 'bottom') {
                        this.min_vel_y = (-collision.details.distance + 0.01) * CONSTANTS.updates_per_second;
                    }
                }
            }
        });
        super.process_collisions(collisions);
    }
}

export { Character };