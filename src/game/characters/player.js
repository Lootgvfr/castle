import { current_held_keys } from "../main";
import { Character } from "../base/character";

class Player extends Character {
    type = 'player';
    is_controllable = true;
    is_standing = true;
    move_velocity = 200;

    constructor(
        {
            pos_x = 0,
            pos_y = 0
        }
    ) {
        super(
            {
                display_data: [{
                    width: 15,
                    height: 40,
                    color: 'blue'
                }],
                collision_boxes: [{
                    width: 15,
                    height: 40
                }],
                pos_x: pos_x,
                pos_y: pos_y
            }
        );
    }

    update (game_state, game_clock_time, collisions) {
        this.process_inputs();
        this.process_collisions(collisions);
        super.update(game_state, game_clock_time, collisions);
    }

    process_inputs () {
        if (this.is_controllable) {
            this.is_standing = !current_held_keys.has('KeyS');
            this.display_data[0].height = this.is_standing ? 40: 25;
            this.collision_boxes[0].height = this.is_standing ? 40: 25;

            this.input_vel_x = 0;
            this.input_vel_y = 0;
            if (current_held_keys.has('KeyD')) {
                this.input_vel_x += this.move_velocity;
            }
            if (current_held_keys.has('KeyA')) {
                this.input_vel_x -= this.move_velocity;
            }
            if (current_held_keys.has('KeyW')) {
                this.input_vel_y += this.move_velocity;
            }
            if (current_held_keys.has('KeyS')) {
                this.input_vel_y -= this.move_velocity;
            }
        }
    }

    process_collisions (collisions) {
        collisions.forEach((collision) => {
            console.log(`player collided with ${collision.other_object.type} ${collision.other_object.id} on side ${collision.side}!`);
        });
    }
}

export { Player };