import { LEVELS } from "./levels";
import { Player } from "./characters/player";
import { DisplayComponent, scale_coordinate } from "./base/display_component";
import { CONSTANTS } from "./config/constants";
import { OBJECTS } from "./objects";

class GameState {
    player;
    objects;
    characters;
    time_step;
    canvases;

    constructor (canvases, level_slug) {
        this.load_level(level_slug);
        this.time_step = CONSTANTS.update_time;
        this.canvases = canvases;
    }

    load_level (level_slug) {
        /* Load level config into the current game state */
        const level = LEVELS[level_slug];
        if (!level) {
            throw `Unknown level "${level}"`;
        }

        this.player = new Player(level.player.constructor_data);

        this.objects = [];
        let object_class;
        level.objects.forEach((obj) => {
            object_class = OBJECTS[obj.slug];
            if (object_class) {
                this.objects.push(new object_class(obj.constructor_data));
            }
        });

        this.characters = [];
        this.draw_background(level.background);
    }

    update (game_clock_time) {
        /* Update the state of all entities in the game */
        const collisions = this.calculate_collisions();

        this.player.update(this, game_clock_time, collisions[this.player.id]);

        this.objects.forEach((obj) => {
            obj.update(this, game_clock_time, collisions[obj.id]);
        });
    }

    draw () {
        /* Draw all entities in the game */
        this.clear_canvas('main');

        this.player.draw();

        this.objects.forEach((obj) => {
            obj.draw();
        });
    }

    draw_background (background_config) {
        /* Draw background of the level */
        const background = new DisplayComponent({
            display_type: background_config.type,
            color: background_config.color,
            width: CONSTANTS.width,
            height: CONSTANTS.height - 1,
            filled: false,
            canvas_slug: 'background'
        });
        background.draw(0, 1);
    }

    clear_canvas (canvas_slug) {
        const ctx = this.canvases[canvas_slug].context;
        ctx.clearRect(
            0,
            0,
            scale_coordinate(CONSTANTS.width, false),
            scale_coordinate(CONSTANTS.height, false)
        );
    }

    calculate_collisions () {
        /* Calculates collisions between all relevant objects
         * Returns a dict where keys are entity IDs and values are collision lists */
        const collisions = {};
        collisions[this.player.id] = [];

        for (let i = 0; i < this.objects.length; i++) {
            let obj = this.objects[i];
            collisions[obj.id] = [];

            this.player.collision_boxes.forEach((player_box) => {
                obj.collision_boxes.forEach((object_box) => {
                    this._calculate_collisions(player_box, object_box, collisions, true);
                });
            });

            // if object isn't ground, calculate collisions between it and other objects
            if (obj.type !=='ground') {
                for (let j = i + 1; j < this.objects.length; j++) {
                    let other_obj = this.objects[j];

                    obj.collision_boxes.forEach((first_object_box) => {
                        other_obj.collision_boxes.forEach((second_object_box) => {
                            this._calculate_collisions(first_object_box, second_object_box, collisions, false);
                        })
                    })
                }
            }
        }

        return collisions;
    }

    _calculate_collisions (first_box, second_box, collisions, calculate_side) {
        /* Calculates collisions between given boxes and adds them to the relevant lists */
        if (first_box.is_active && second_box.is_active) {
            let collision_side = first_box.collision_side(second_box, calculate_side);
            if (collision_side) {
                collisions[first_box.entity.id].push({
                    own_box: first_box,
                    other_object: second_box.entity,
                    other_box: second_box,
                    side: collision_side
                });
                collisions[second_box.entity.id].push({
                    own_box: second_box,
                    other_object: first_box.entity,
                    other_box: first_box,
                    side: second_box.reverse_collision_side(collision_side)
                });
            }
        }
    }
}

export { GameState };