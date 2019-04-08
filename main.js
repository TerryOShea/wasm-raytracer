import Vector from "./raytracer";

const canvas = document.getElementById("c");
const width = 320;
const height = 240;

canvas.width = width;
canvas.height = height;
canvas.style.cssText = "width:" + width * 2 + "px;height:" + height * 2 + "px";

const ctx = canvas.getContext("2d");
const data = ctx.getImageData(0, 0, width, height);

const scene = {};

scene.camera = {
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
};

scene.lights = [
  {
    x: -30,
    y: -10,
    z: 20
  }
];

scene.objects = [
  {
    type: "sphere",
    point: {
      x: 0,
      y: 3.5,
      z: -3
    },
    color: {
      x: 155,
      y: 200,
      z: 155
    },
    specular: 0.2,
    lambert: 0.7,
    ambient: 0.1,
    radius: 3
  },
  {
    type: "sphere",
    point: {
      x: -4,
      y: 2,
      z: -1
    },
    color: {
      x: 155,
      y: 155,
      z: 155
    },
    specular: 0.1,
    lambert: 0.9,
    ambient: 0.0,
    radius: 0.2
  },
  {
    type: "sphere",
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
    specular: 0.2,
    lambert: 0.7,
    ambient: 0.1,
    radius: 0.1
  }
];

const render = s => {
  const { camera, objects, lights } = s;

  const eyeVector = Vector.unitVector(
    Vector.subtract(camera.vector, camera.point)
  );
  const vpRight = Vector.unitVector(Vector.crossProduct(eyeVector, Vector.UP));
  const upUp = Vector.unitVector(Vector.crossProduct(vpRight, eyeVector));
  const fovRadians = (Math.PI * (camera.fieldOfView / 2)) / 180;
  const heightWidthRatio = height / width;
  const halfWidth = Math.tan(fovRadians);
  const halfHeight = HeightWidthRatio * halfWidth;
  const cameraWidth = halfWidth * 2;
  const cameraHeight = halfHeight * 2;
  const pixelWidth = cameraWidth / (width - 1);
  const pixelHeight = cameraHeight / (height - 1);

  let index, color;
  const ray = {
    point: camera.point
  };

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const xcomp = Vector.scale(vpRight, x * pixelWidth - halfWidth);
      const ycomp = Vector.scale(vpUp, y * pixelHeight - halfHeight);

      ray.vector = Vector.unitVector(Vector.add(eyeVector, xcomp, ycomp));

      color = trace(ray, s, 0);
      index = x * 4 + y * width * 4;
      data.data[index + 0] = color.x;
      data.data[index + 1] = color.y;
      data.data[index + 2] = color.z;
      data.data[index + 3] = 255;
    }
  }

  ctx.putImageData(data, 0, 0);
};

const trace = (ray, s, depth) => {
  if (depth > 3) {
    return;
  }

  const [dist, obj] = intersectScene(ray, s);
  if (!obj) {
    return Vector.WHITE;
  }

  const pointAtTime = Vector.add(ray.point, Vector.scale(ray.vector, dist));
  return surface(
    ray,
    s,
    obj,
    pointAtTime,
    sphereNormal(obj, pointAtTime),
    depth
  );
};

const intersectScene = (ray, s) => {
  let closest = [Infinity, null];

  s.objects.forEach(obj => {
    const dist = sphereIntersection(obj, ray);
    if (dist !== undefined && dist < closest[0]) {
      closest = [dist, obj];
    }
  });

  return closest;
};

const sphereIntersection = (sphere, ray) => {
  const eyeToCenter = Vector.subtract(sphere.point, ray.point);
  const v = Vector.dotProduct(eyeToCenter, ray.vector);
  const eoDot = Vector.dotProduct(eyeToCenter, eyeToCenter);
  const discriminant = sphere.radius * sphere.radius - eoDot + v * v;

  // sphere hasn't been hit by ray
  if (discriminant < 0) {
    return;
  } else {
    return v - Math.sqrt(discriminant);
  }
};

const sphereNormal = (sphere, pos) =>
  Vector.unitVector(Vector.subtract(pos, sphere.point));

const surface = (ray, s, object, pointAtTime, normal, depth) => {
  let lambertAmount = 0;
  let c = Vector.ZERO;
  let b = object.color;

  if (object.lambert) {
    s.lights.forEach(lightPoint => {
      if (isLightVisible(pointAtTime, s, lightPoint)) {
        const contribution = Vector.dotProduct(
          Vector.unitVector(Vector.subtract(lightPoint, pointAtTime)),
          normal
        );
        if (contribution > 0) {
          lambertAmount += contribution;
        }
      }
    });
  }

  if (object.specular) {
    const reflectedRay = {
      point: pointAtTime,
      vector: Vector.reflectThrough(ray.vector, normal)
    };
    const reflectedColor = trace(reflectedRay, s, depth + 1);
    if (reflectedColor) {
      c = Vector.add(c, Vector.scale(reflectedColor, object.specular)); // need to add c here?
    }
  }

  lambertAmount = Math.min(1, lambertAmount);

  return Vector.add(
    c,
    Vector.scale(b, lambertAmount * object.lambert),
    Vector.scale(b, object.ambient)
  );
};

const isLightVisible = (pt, s, light) => {
  const distObject = intersectScene(
    {
      point: pt,
      vector: Vector.unitVector(Vector.subtract(pt, light))
    },
    s
  );
  return distObject[0] > -0.005;
};

let moon1 = 0;
let moon2 = 0;

const tick = () => {
  moon1 += 0.1;
  moon2 += 0.2;

  scene.objects[1].point.x = Math.sin(moon1) * 3.5;
  scene.objects[1].point.z = -3 + Math.cos(moon1) * 3.5;

  scene.objects[2].point.x = Math.sin(moon2) * 4;
  scene.objects[2].point.z = -3 + Math.cos(moon2) * 4;

  render(scene);
  setTimeout(tick, 10);
};

tick();
