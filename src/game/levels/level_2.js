export default {
    name: 'Level 2',
    player: {
        constructor_data: {
            pos_x: 750,
            pos_y: 315
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
        { // rightmost platform
            slug: 'ground',
            constructor_data: {
                pos_x: 740,
                pos_y: 300,
                width: 40,
                height: 15
            }
        },
        { // second from right platform
            slug: 'ground',
            constructor_data: {
                pos_x: 600,
                pos_y: 320,
                width: 40,
                height: 15
            }
        },
        { // third from right platform
            slug: 'ground',
            constructor_data: {
                pos_x: 440,
                pos_y: 270,
                width: 40,
                height: 15
            }
        },
        { // fourth from right platform
            slug: 'ground',
            constructor_data: {
                pos_x: 300,
                pos_y: 280,
                width: 40,
                height: 15
            }
        },
        { // ending platform
            slug: 'ground',
            constructor_data: {
                pos_x: 0,
                pos_y: 200,
                width: 140,
                height: 10
            }
        },
        { // bump one
            slug: 'ground',
            constructor_data: {
                pos_x: 250,
                pos_y: 5,
                width: 8,
                height: 25
            }
        },
        { // bump two
            slug: 'ground',
            constructor_data: {
                pos_x: 425,
                pos_y: 5,
                width: 8,
                height: 45
            }
        },
        { // bump three
            slug: 'ground',
            constructor_data: {
                pos_x: 650,
                pos_y: 5,
                width: 8,
                height: 60
            }
        },
        { // right under-platform
            slug: 'ground',
            constructor_data: {
                pos_x: 720,
                pos_y: 130,
                width: 80,
                height: 10
            }
        },
        { // meme square lower
            slug: 'ground',
            constructor_data: {
                pos_x: 620,
                pos_y: 170,
                width: 10,
                height: 10
            }
        },
        { // meme square higher
            slug: 'ground',
            constructor_data: {
                pos_x: 700,
                pos_y: 230,
                width: 10,
                height: 10
            }
        },
        { // level transition
            slug: 'level_transition',
            constructor_data: {
                pos_x: 50,
                pos_y: 210,
                width: 25,
                height: 50,
                next_level: 'level_1'
            }
        }
    ],
    background: {
        type: 'rectangle',
        color: 'red'
    }
};