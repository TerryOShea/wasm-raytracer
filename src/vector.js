export const UP = { x: 0, y: 1, z: 0 };
export const ZERO = { x: 0, y: 0, z: 0 };
export const WHITE = { x: 255, y: 255, z: 255 };

export const dotProduct = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z;

export const crossProduct = (a, b) => ({
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x
});

export const scale = (a, t) => ({
    x: a.x * t,
    y: a.y * t,
    z: a.z * t
});

export const length = a => Math.sqrt(dotProduct(a, a));

export const unitVector = a => scale(a, 1 / length(a));

export const add = (...vectors) => {
    const added = { x: 0, y: 0, z: 0 };

    vectors.forEach(vector => {
        added.x += vector.x;
        added.y += vector.y;
        added.z += vector.z;
    });

    return added;
};

export const subtract = (a, b) => ({
    x: a.x - b.x,
    y: a.y - b.y,
    z: a.z - b.z
});

export const reflectThrough = (a, normal) => {
    const d = scale(normal, dotProduct(a, normal));
    return subtract(scale(d, 2), a);
};
