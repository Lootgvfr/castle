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
        {
            slug: 'ground',
            constructor_data: {
                pos_x: 200,
                pos_y: 0,
                width: 30,
                height: 60
            }
        },
        {
            slug: 'ground',
            constructor_data: {
                pos_x: 300,
                pos_y: 0,
                width: 30,
                height: 80
            }
        },
        {
            slug: 'ground',
            constructor_data: {
                pos_x: 400,
                pos_y: 0,
                width: 30,
                height: 120
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
                pos_y: 230,
                width: 50,
                height: 20
            }
        },
        {
            slug: 'ground',
            constructor_data: {
                pos_x: 330,
                pos_y: 180,
                width: 50,
                height: 20
            }
        },
        {
            slug: 'ground',
            constructor_data: {
                pos_x: 470,
                pos_y: 0,
                width: 30,
                height: 70
            }
        },
        {
            slug: 'ground',
            constructor_data: {
                pos_x: 165,
                pos_y: 240,
                width: 10,
                height: 60
            }
        },
        {
            slug: 'ground',
            constructor_data: {
                pos_x: 0,
                pos_y: 0,
                width: 800,
                height: 5
            }
        }
    ],
    background: {
        type: 'rectangle',
        color: 'black'
    }
};