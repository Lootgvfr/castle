import { LAYERS } from './config/layers';
import { CONSTANTS } from './config/constants';
import { GameState } from "./state";

// =================== CONSTANT ===================

const GAME_STATES = {
    RUNNING: 'running',
    PAUSED: 'paused'
};

// ===================== VARS =====================

let game_state;
let game_status = GAME_STATES.RUNNING;

let game_clock_time = 0;
let last_time = window.performance.now();
let current_time = 0;
let frame_time = 0;
let accumulated_time = 0;

let canvases = {};
let canvas_scale = 1;

let current_held_keys = new Set();

// =================== INTERFACE ==================

function change_game_status (new_state) {
    if (Object.values(GAME_STATES).includes(new_state)) {
        game_status = new_state;
    } else {
        throw `Invalid new state "${new_state}"`;
    }
}

function start_game (c_width) {
    canvas_scale = c_width / CONSTANTS.width;
    console.log('CANVAS SCALE ' + canvas_scale);

    LAYERS.forEach((layer) => {
        const canvas = document.getElementById(layer.slug);
        canvases[layer.slug] = {
            canvas: canvas,
            context: canvas.getContext('2d')
        };
    });

    game_state = new GameState(canvases, 'level_1');

    function loop () {
        if (game_status === GAME_STATES.RUNNING) {
            current_time = window.performance.now();
            frame_time = Math.min(1000, current_time - last_time);
            accumulated_time += frame_time;
            last_time = current_time;

            // if enough time passed since last state update, do it and reduce the accumulator value
            while (accumulated_time >= CONSTANTS.update_time) {
                accumulated_time -= CONSTANTS.update_time;
                game_clock_time += CONSTANTS.update_time;
                game_state.update(game_clock_time);
            }

            // redraw the state on every loop
            game_state.draw();

            document.getElementById('frame-time').innerHTML = frame_time.toString();
        }
        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
}

export {
    LAYERS,
    CONSTANTS,
    GAME_STATES,
    game_status,
    canvases,
    canvas_scale,
    current_held_keys,

    change_game_status,
    start_game
};