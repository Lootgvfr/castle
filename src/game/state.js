import { LEVELS } from "./levels";
import { Player } from "./characters/player";
import { DisplayData, scale_coordinate } from "./base/display_component";
import { CONSTANTS } from "./config/constants";

class GameState {
    player;
    objects;
    units;
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

        this.player = new Player({
            pos_x: level.player.pos_x,
            pos_y: level.player.pos_y
        });

        this.draw_background(level.background);
    }

    draw_background (background_config) {
        /* Draw background of the level */
        const background = new DisplayData({
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
        this.player.update(this, game_clock_time);
    }

    draw () {
        /* Draw all entities in the game */
        this.clear_canvas('main');
        this.player.draw();
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