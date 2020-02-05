const CONSTANTS = {
    scale: 16 / 9,
    width: 800,
    updates_per_second: 60
};

CONSTANTS.height = CONSTANTS.width / CONSTANTS.scale;
CONSTANTS.update_time = 1000 / CONSTANTS.updates_per_second;

export { CONSTANTS };