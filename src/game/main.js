import { LAYERS } from './config/layers';
import { CONSTANTS } from './config/constants';

// =================== CONSTANT ===================

const GAME_STATES = {
    RUNNING: 'running',
    PAUSED: 'paused'
};

// ===================== VARS =====================

let game_state = GAME_STATES.RUNNING;

let game_clock_time = 0;
let last_time = window.performance.now();
let current_time = 0;
let frame_time = 0;
let accumulated_time = 0;

let canvas_width = 0;

// =================== INTERFACE ==================

function change_game_state (new_state) {
    if (Object.values(GAME_STATES).includes(new_state)) {
        game_state = new_state;
    } else {
        throw `Invalid new state ${new_state}`;
    }
}

function start_game_loop (c_width) {
    canvas_width = c_width;

    function loop () {
        if (game_state === GAME_STATES.RUNNING) {
            current_time = window.performance.now();
            frame_time = Math.min(1000, current_time - last_time);
            accumulated_time += frame_time;
            last_time = current_time;

            while (accumulated_time >= CONSTANTS.update_time) {
                accumulated_time -= CONSTANTS.update_time;
                game_clock_time += CONSTANTS.update_time;
            }

            document.getElementById('frame-time').innerHTML = frame_time.toString();
            requestAnimationFrame(loop);
        }
    }

    requestAnimationFrame(loop);
}

export {
    LAYERS,
    CONSTANTS,
    GAME_STATES,
    game_state,
    change_game_state,
    start_game_loop
};