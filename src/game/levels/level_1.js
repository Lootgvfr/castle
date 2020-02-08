export default {
    name: 'Level 1',
    player: {
        constructor_data: {
            pos_x: 0,
            pos_y: 0
        },
    },
    characters: [],
    objects: [
        {
            slug: 'ground',
            constructor_data: {
                pos_x: 200,
                pos_y: 0,
                width: 30,
                height: 100
            }
        },
        {
            slug: 'ground',
            constructor_data: {
                pos_x: 0,
                pos_y: 300,
                width: 200,
                height: 10
            }
        },
        {
            slug: 'ground',
            constructor_data: {
                pos_x: 250,
                pos_y: 250,
                width: 50,
                height: 50
            }
        },
    ],
    background: {
        type: 'rectangle',
        color: 'black'
    }
};