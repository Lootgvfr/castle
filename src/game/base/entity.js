import { DisplayComponent, scale_coordinate } from "./display_component";
import { CONSTANTS } from "../config/constants";
import { CollisionBox } from "./collision_box";
import { canvases } from "../main";
import crypto from "crypto";

class Entity {
    // Entity type. Possible values:
    // - player
    // - enemy
    // - npc
    // - ground
    type;
    id; // unique ID of the entity

    display_data; // list of DisplayComponent instances
    collision_boxes; // list of CollisionBox instances
    pos_x; // X axis position
    pos_y; // Y axis position
    vel_x; // X axis velocity
    vel_y; // Y axis velocity
    input_vel_x = 0; // X axis velocity from controls
    input_vel_y = 0; // Y axis velocity from controls
    max_vel_x = Infinity;
    max_vel_y = Infinity;
    min_vel_x = -Infinity;
    min_vel_y = -Infinity;
    apply_gravity = false;
    can_move = false;

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

        this.id = crypto.randomBytes(20).toString('hex');
    }

    update (game_state, game_clock_time, collisions) {
        /* Update entity state for the next step */
        this.process_collisions(collisions);
        if (this.can_move) {
            this.update_position();
        }
        this.update_velocity();
    }

    get actual_vel_x () {
        /* return actual X velocity that will be used (per second) */
        return Math.max(this.min_vel_x, Math.min(this.vel_x + this.input_vel_x, this.max_vel_x));
    }

    get actual_vel_y () {
        /* return actual Y velocity that will be used (per second) */
        return Math.max(this.min_vel_y, Math.min(this.vel_y + this.input_vel_y, this.max_vel_y));
    }

    get normalized_vel_x () {
        /* return actual X velocity that will be used (per frame) */
        return this.actual_vel_x / CONSTANTS.updates_per_second;
    }

    get normalized_vel_y () {
        /* return actual Y velocity that will be used (per frame) */
        return this.actual_vel_y / CONSTANTS.updates_per_second;
    }

    update_position () {
        /* Update position of the entity */
        this.pos_x += this.normalized_vel_x;
        this.pos_y += this.normalized_vel_y;
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

    update_velocity () {
        if (this.apply_gravity) {
            this.vel_y += CONSTANTS.gravity / CONSTANTS.updates_per_second;
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

    process_collisions () {}

    process_inputs () {}
}

export { Entity };