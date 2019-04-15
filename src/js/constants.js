export const WIDTH = 320;
export const HEIGHT = 240;

export const SCENE = {
    camera: {
        point: {
            x: 0,
            y: 1.8,
            z: 10
        },
        fieldOfView: 45,
        vector: {
            x: 0,
            y: 3,
            z: 0
        }
    },
    lights: [
        {
            x: -30,
            y: -10,
            z: 20
        },
    ],
    objects: [
        {
            point: {
                x: 0,
                y: 3.5,
                z: -3
            },
            color: {
                x: 255,
                y: 230,
                z: 0
            },
            lambert: 0.7,
            ambient: 0.5,
            radius: 3
        },
        {
            point: {
                x: -4,
                y: 2,
                z: -1
            },
            color: {
                x: 153,
                y: 102,
                z: 255
            },
            lambert: 0.9,
            ambient: 0.5,
            radius: 0.2
        },
        {
            point: {
                x: -4,
                y: 3,
                z: -1
            },
            color: {
                x: 255,
                y: 255,
                z: 255
            },
            lambert: 0.7,
            ambient: 0.5,
            radius: 0.1
        }
    ],
};
