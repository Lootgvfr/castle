import { Entity } from '../base/entity';
import { current_held_keys } from "../main";

class Player extends Entity {
    type = 'player';
    is_controllable = true;
    is_standing = true;
    move_velocity = 100;

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
                pos_y: pos_y
            }
        );
    }

    update(game_state, game_clock_time, collisions) {
        this.process_inputs();
        super.update(game_state, game_clock_time, collisions);
    }

    process_inputs() {
        if (this.is_controllable) {
            this.is_standing = !current_held_keys.has('KeyS');
            this.display_data.height = this.is_standing ? 30: 20;

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
        }
    }
}

export { Player };