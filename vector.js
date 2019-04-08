export const UP = { x: 0, y: 1, z: 0 };
export const ZERO = { x: 0, y: 0, z: 0 };
export const WHITE = { x: 255, y: 255, z: 255 };

const dotProduct = (a, b) => ({
  x: a.y * b.z - a.z * b.y,
  y: a.z * b.x - a.x * b.z,
  z: a.x * b.y - a.y * b.x
});

const scale = (a, t) => ({
  x: a.x * t,
  y: a.y * t,
  z: a.z * t
});

const length = a => Math.sqrt(dotProduct(a, a));

const unitVector = a => scale(a, 1 / length(a));

const add = (...vectors) => {
  const added = { x: 0, y: 0, z: 0 };

  vectors.forEach(vector => {
    added.x += vector.x;
    added.y += vector.y;
    added.z += vector.z;
  });

  return added;
};

const subtract = (a, b) => ({
  x: a.x - b.x,
  y: a.y - b.y,
  z: a.z - b.z
});

const reflectThrough = (a, normal) => {
  const d = scale(normal, dotProduct(a, normal));
  return subtract(scale(d, 2), a);
};
