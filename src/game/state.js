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

    update (game_clock_time) {
        /* Update the state of all entities in the game */
        this.player.update(this, game_clock_time, []);

        this.objects.forEach((obj) => {
            obj.update(this, game_clock_time, []);
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

    clear_canvas (canvas_slug) {
        const ctx = this.canvases[canvas_slug].context;
        ctx.clearRect(
            0,
            0,
            scale_coordinate(CONSTANTS.width, false),
            scale_coordinate(CONSTANTS.height, false)
        );
    }
}

export { GameState };