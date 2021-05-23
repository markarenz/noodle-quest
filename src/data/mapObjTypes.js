const mapObjTypes = {
    tileTypes: {
        "none": {
            id: 0,
            walkable: false,
            editorColor: 'transparent',
        },
        "floor-1": {
            id: 1,
            walkable: true,
            editorColor: '#eee'
        },
        "floor-2": {
            id: 2,
            walkable: true,
            editorColor: '#bbb'
        },
        "grass": {
            id: 3,
            walkable: true,
            editorColor: '#aaaaff'
        },
        "water": {
            id: 4,
            walkable: false,
            editorColor: '#aaaaff'
        },
        "water-grass-tr": {
            id: 5,
            walkable: true,
            editorColor: '#aaaaff'
        },
        "water-grass-tl": {
            id: 6,
            walkable: true,
            editorColor: '#aaaaff'
        },
        "water-grass-bl": {
            id: 7,
            walkable: true,
            editorColor: '#aaaaff'
        },
        "water-grass-br": {
            id: 8,
            walkable: true,
            editorColor: '#aaaaff'
        },
        "water-grass-t": {
            id: 9,
            walkable: true,
            editorColor: '#aaaaff'
        },
        "water-grass-b": {
            id: 10,
            walkable: true,
            editorColor: '#aaaaff'
        },
        "water-grass-l": {
            id: 11,
            walkable: true,
            editorColor: '#aaaaff'
        },
        "water-grass-r": {
            id: 12,
            walkable: true,
            editorColor: '#aaaaff'
        },
        "grass-pool": {
            id: 13,
            walkable: false,
            editorColor: '#aaaaff'
        },
        "bridge-ns": {
            id: 14,
            walkable: true,
            editorColor: '#aaaaff'
        },
        "bridge-ew": {
            id: 15,
            walkable: true,
            editorColor: '#aaaaff'
        },
        "water-grass-cnr-tl": {
            id: 16,
            walkable: true,
            editorColor: '#aaaaff'
        },
        "water-grass-cnr-tr": {
            id: 17,
            walkable: true,
            editorColor: '#aaaaff'
        },
        "water-grass-cnr-bl": {
            id: 18,
            walkable: true,
            editorColor: '#aaaaff'
        },
        "water-grass-cnr-br": {
            id: 19,
            walkable: true,
            editorColor: '#aaaaff'
        },
        "water-grass-cnr-bltr": {
            id: 20,
            walkable: true,
            editorColor: '#aaaaff'
        },
        "water-grass-cnr-brtl": {
            id: 21,
            walkable: true,
            editorColor: '#aaaaff'
        },
    },
    wallTypes: {
        "none": {
            id: 0,
            passable: true,
            editorColor: '#eee'
        },
        "wall1": {
            id: 1,
            passable: false,
            editorColor: '#333',
        },
        "wall2": {
            id: 2,
            passable: false,
            editorColor: '#666',
        },
        "door1": {
            id: 3,
            passable: false,
            editorColor: '#d23d45',
        },
        "door1open": {
            id: 4,
            passable: true,
            editorColor: '#fd8bff',
        },
        "trees1": {
            id: 5,
            passable: false,
            editorColor: '#33aa33',
        },
        "fence1": {
            id: 6,
            passable: false,
            editorColor: '#885720',
        },
        "clear": {
            id: 7,
            passable: false,
            editorColor: '#8bdede',
        },
        "door2": {
            id: 8,
            passable: false,
            editorColor: '#ccd256',
        },
        "door2open": {
            id: 9,
            passable: true,
            editorColor: '#d23d45',
        },
    },
    itemTypes: {
        "ladder-up": {
            id: 0,
            passable: true,
            action: 'moveUp',
            layer: 0,
        },
        "ladder-down": {
            id: 1,
            passable: true,
            action: 'moveDown',
            layer: 0,
        },
        "coins-small": {
            id: 2,
            passable: true,
            action: 'consume',
            value: 25,
            layer: 1,
        },
        "coins-large": {
            id: 3,
            passable: true,
            action: 'consume',
            value: 100,
            layer: 1,
        },
        "key1": {
            id: 4,
            passable: true,
            required: 'door1',
            action: 'take',
            value: 50,
            invAction: {
                actionType: 'door',
                actionConsumable: true,
                special: 1,
            },
            layer: 1,
        },
        "arrow-w": {
            id: 5,
            passable: true,
            action: 'teleport',
            layer: 0,
        },
        "arrow-e": {
            id: 6,
            passable: true,
            action: 'teleport',
            layer: 0,
        },
        "arrow-n": {
            id: 7,
            passable: true,
            action: 'teleport',
            layer: 0,
        },
        "arrow-s": {
            id: 8,
            passable: true,
            action: 'teleport',
            layer: 0,
        },
        "balloony1": {
            id: 9,
            passable: true,
            action: 'talk',
            layer: 1,
        },
        "balloony2": {
            id: 10,
            passable: true,
            action: 'talk',
            layer: 1,
        },
        "balloony3": {
            id: 11,
            passable: true,
            action: 'talk',
            layer: 1,
        },
        "balloony4": {
            id: 12,
            passable: true,
            action: 'talk',
            layer: 1,
        },
        "fishing-pole": {
            id: 13,
            passable: true,
            layer: 1,
            action: 'take',
            value: 50,
            invAction: {
                actionType: 'fish',
                actionConsumable: true,
                special: 'salmon',
            },
        },
        "salmon": {
            id: 14,
            passable: true,
            layer: 1,
            action: 'take',
            value: 125,
            invAction: {
                actionType: 'clear',
                actionConsumable: true,
                objectToClear: 'bear',
                value: 100,
                successText: 'The bear takes the salmon gladly and lopes away.',
            },
        },
        "bear": {
            id: 15,
            passable: false,
            action: 'give',
            layer: 1,
        },
        "acorn": {
            id: 16,
            passable: true,
            layer: 1,
            action: 'take',
            value: 125,
            invAction: {
                actionType: 'clear',
                actionConsumable: true,
                objectToClear: 'squirrel',
                value: 100,
                successText: '"Ooh, an acorn!" squeaks the squirrel, scurrying off into the meadow.',
            },
        },
        "squirrel": {
            id: 17,
            passable: false,
            action: 'give',
            layer: 1,
        },
        "bread": {
            id: 18,
            passable: true,
            layer: 1,
            action: 'take',
            value: 125,
            invAction: {
                actionType: 'clear',
                actionConsumable: true,
                objectToClear: 'duck',
                value: 100,
                successText: '"QUACK!" The duck squawks loudly and happily with the bread in her mouth and waddles off.',
            },
        },
        "duck": {
            id: 19,
            passable: false,
            action: 'give',
            layer: 1,
        },
        "carrot": {
            id: 20,
            passable: true,
            layer: 1,
            action: 'take',
            value: 125,
            invAction: {
                actionType: 'clear',
                actionConsumable: true,
                objectToClear: 'rabbit',
                value: 100,
                successText: 'Chomp chomp chomp. The rabbit bows slightly to thank you for your gift and hops away.',
            },
        },
        "rabbit": {
            id: 21,
            passable: false,
            action: 'give',
            layer: 1,
        },
        "noodle": {
            id: 22,
            passable: true,
            required: 'door1',
            action: 'take',
            value: 50,
            invAction: {
                actionType: 'fill-bowl',
                actionConsumable: true,
                value: 75,
                special: 1,
            },
            layer: 1,
        },
        "bowl": {
            id:23,
            passable: false,
            action: '',
            layer: 1,
        },
        "sign": {
            id:24,
            passable: true,
            action: 'sign',
            layer: 1,
        },
        "teleporter": {
            id: 25,
            passable: true,
            required: '',
            action: 'take',
            value: 250,
            invAction: {
                actionType: 'teleport-home',
                actionConsumable: false,
                value: 0,
            },
            layer: 1,
        },
        "marker": {
            id:26,
            passable: true,
            action: 'marker',
            layer: 1,
        },
        "marker-found": {
            id:27,
            passable: true,
            action: 'marker-found',
            layer: 1,
        },
        "key2": {
            id: 28,
            passable: true,
            required: 'door2',
            action: 'take',
            value: 50,
            invAction: {
                actionType: 'door',
                actionConsumable: true,
                special: 2,
            },
            layer: 1,
        },

    }
};

export default {
    mapObjTypes
}
