import { Entity } from "./entity";

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
        collisions.forEach((collision) => {
            // console.log(`character of type ${this.type} ${this.id} collided with
            //             ${collision.other_object.type} ${collision.other_object.id}
            //             on side ${collision.side}!`);
            if (collision.other_object.type === 'ground') {
                if (collision.side === 'left') {
                    this.input_vel_x = Math.max(0, this.input_vel_x);
                } else if (collision.side === 'right') {
                    this.input_vel_x = Math.min(0, this.input_vel_x);
                } else if (collision.side === 'top') {
                    this.vel_y = Math.min(0, this.vel_y);
                } else if (collision.side === 'bottom') {
                    this.vel_y = Math.max(0, this.vel_y);
                    this.in_air = false;
                }
            }
        });
        super.process_collisions(collisions);
    }
}

export { Character };