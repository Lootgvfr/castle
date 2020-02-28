export default {
    name: 'Level 1',
    player: {
        constructor_data: {
            pos_x: 0,
            pos_y: 5
        },
    },
    characters: [],
    objects: [
        { // bottom ground
            slug: 'ground',
            constructor_data: {
                pos_x: 0,
                pos_y: 0,
                width: 800,
                height: 5
            }
        },
        { // first, low column
            slug: 'ground',
            constructor_data: {
                pos_x: 200,
                pos_y: 0,
                width: 30,
                height: 60
            }
        },
        { // second, avg column
            slug: 'ground',
            constructor_data: {
                pos_x: 300,
                pos_y: 0,
                width: 30,
                height: 80
            }
        },
        { // third, tallest column
            slug: 'ground',
            constructor_data: {
                pos_x: 380,
                pos_y: 0,
                width: 30,
                height: 120
            }
        },
        { // horizontal line above
            slug: 'ground',
            constructor_data: {
                pos_x: 0,
                pos_y: 300,
                width: 200,
                height: 10
            }
        },
        { // left flying step
            slug: 'ground',
            constructor_data: {
                pos_x: 250,
                pos_y: 230,
                width: 50,
                height: 20
            }
        },
        { // right flying step
            slug: 'ground',
            constructor_data: {
                pos_x: 330,
                pos_y: 180,
                width: 50,
                height: 20
            }
        },
        { // last, smaller column
            slug: 'ground',
            constructor_data: {
                pos_x: 450,
                pos_y: 0,
                width: 30,
                height: 70
            }
        },
        { // vertical line above
            slug: 'ground',
            constructor_data: {
                pos_x: 165,
                pos_y: 240,
                width: 10,
                height: 60
            }
        },
        { // level transition
            slug: 'level_transition',
            constructor_data: {
                pos_x: 50,
                pos_y: 310,
                width: 25,
                height: 50,
                next_level: 'level_2'
            }
        }
    ],
    background: {
        type: 'rectangle',
        color: 'black'
    }
};