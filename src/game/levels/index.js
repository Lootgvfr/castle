import level_1 from "./level_1";

const levels = [
    level_1
];

const LEVELS = {};

levels.forEach((level) => {
    LEVELS[level.slug] = level;
});

export { LEVELS };