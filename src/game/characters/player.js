import { current_held_keys } from "../main";
import { Character } from "../base/character";

class Player extends Character {
    type = 'player';
    is_controllable = true; // can be controlled by player input
    move_velocity = 200;
    jump_velocity = 500;
    jump_grace_period_frames = 2;

    is_standing = true; // is not crouching
    interact_used; // was an "interact" button pressed on this frame
    game_state; // reference to the GameState object

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
        this.game_state = game_state;
        super.update(game_state, game_clock_time, collisions);
    }

    process_collisions(collisions) {
        collisions.forEach((collision) => {
            if (collision.other_object.type === 'level_transition') {
                // have collision with a level transition
                const transition = collision.other_object;
                if (!transition.require_interact || this.interact_used) {
                    this.game_state.load_next_level = transition.next_level;
                }
            }
        });
        super.process_collisions(collisions);
    }

    process_inputs () {
        this.interact_used = false;
        if (this.is_controllable) {
            this.interact_used = current_held_keys.has('KeyF') && !this.in_air;
            this.is_standing = !current_held_keys.has('KeyS') || this.in_air;
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
            if (current_held_keys.has('KeyW') &&
                (!this.in_air || this.jump_grace_period_counter <= this.jump_grace_period_frames)) {
                this.vel_y = this.jump_velocity;
                this.jump_grace_period_counter = this.jump_grace_period_frames + 1;
            }
        }
    }
}

export { Player };