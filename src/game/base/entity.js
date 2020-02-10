import { DisplayComponent, scale_coordinate } from "./display_component";
import { CONSTANTS } from "../config/constants";
import { CollisionBox } from "./collision_box";
import { canvases } from "../main";

class Entity {
    // Entity type. Possible values:
    // - player
    // - enemy
    // - npc
    // - ground
    type;

    display_data; // list of DisplayComponent instances
    collision_boxes; // list of CollisionBox instances
    pos_x; // X axis position
    pos_y; // Y axis position
    vel_x; // X axis velocity
    vel_y; // Y axis velocity
    input_vel_x = 0; // X axis velocity from player controls
    input_vel_y = 0; // Y axis velocity from player controls

    constructor(
        {
            display_data = [],
            collision_boxes = [],
            pos_x = 0,
            pos_y = 0,
            vel_x = 0,
            vel_y = 0
        }
    ) {
        this.display_data = [];
        display_data.forEach((data) => {
            this.display_data.push(new DisplayComponent(data));
        });

        this.collision_boxes = [];
        collision_boxes.forEach((box) => {
            let temp_box = { entity: this };
            Object.assign(temp_box, box);
            this.collision_boxes.push(new CollisionBox(temp_box));
        });

        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.vel_x = vel_x;
        this.vel_y = vel_y;
    }

    update (game_state, game_clock_time, collisions) {
        /* Update entity state for the next step */
        this.update_position();
    }

    update_position () {
        /* Update position of the entity */
        this.pos_x += (this.vel_x + this.input_vel_x) / CONSTANTS.updates_per_second;
        this.pos_y += (this.vel_y + this.input_vel_y) / CONSTANTS.updates_per_second;
        if (this.pos_x > CONSTANTS.width) {
            this.pos_x = CONSTANTS.width;
        } else if (this.pos_x < 0) {
            this.pos_x = 0;
        }
        if (this.pos_y > CONSTANTS.height) {
            this.pos_y = CONSTANTS.height;
        } else if (this.pos_y < 0) {
            this.pos_y = 0;
        }
    }

    draw () {
        /* Draw entity on the canvas */
        this.display_data.forEach((comp) => {
            comp.draw(this.pos_x, this.pos_y);
        });
        if (CONSTANTS.draw_collision_boxes) {
            const ctx = canvases[this.display_data[0].canvas_slug].context;
            this.collision_boxes.forEach((collision_box) => {
                ctx.strokeStyle = 'lime';
                ctx.beginPath();
                ctx.rect(
                    scale_coordinate(collision_box.pos_x, false),
                    scale_coordinate(collision_box.pos_y + collision_box.height, true),
                    scale_coordinate(collision_box.width, false),
                    scale_coordinate(collision_box.height, false)
                );
                ctx.stroke();
            })
        }
    }
}

export { Entity };