import { WIDTH, HEIGHT } from './constants';
import * as Vector from "./vector";

const generateNewPixelData = scene => {
    const { camera } = scene;

    const eyeVector = Vector.unitVector(
        Vector.subtract(camera.vector, camera.point)
    );
    const vpRight = Vector.unitVector(
        Vector.crossProduct(eyeVector, Vector.UP)
    );
    const vpUp = Vector.unitVector(Vector.crossProduct(vpRight, eyeVector));
    const fovRadians = (Math.PI * (camera.fieldOfView / 2)) / 180;
    const heightWidthRatio = HEIGHT / WIDTH;
    const halfWidth = Math.tan(fovRadians);
    const halfHeight = heightWidthRatio * halfWidth;
    const cameraWidth = halfWidth * 2;
    const cameraHeight = halfHeight * 2;
    const pixelWidth = cameraWidth / (WIDTH - 1);
    const pixelHeight = cameraHeight / (HEIGHT - 1);

    const ray = {
        point: camera.point
    };

    let idx = 0;
    const data = Array.from({ length: HEIGHT * WIDTH });

    for (let row = 0; row < HEIGHT; row++) {
        for (let col = 0; col < WIDTH; col++) {
            const rowcomp = Vector.scale(vpUp, row * pixelHeight - halfHeight);
            const colcomp = Vector.scale(vpRight, col * pixelWidth - halfWidth);

            ray.vector = Vector.unitVector(Vector.add(eyeVector, rowcomp, colcomp));

            const color = trace(ray, scene);
            data[idx] = color.x;
            data[idx + 1] = color.y;
            data[idx + 2] = color.z;
            data[idx + 3] = 255;
            idx += 4;
        }
    }

    return data;
};

const trace = (ray, s) => {
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
    );
};

const intersectScene = (ray, s) => {
    let closest = [Infinity, null];

    s.objects.forEach(obj => {
        const dist = sphereIntersection(obj, ray);
        if (dist < closest[0]) {
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
        return Infinity;
    } else {
        return v - Math.sqrt(discriminant);
    }
};

const sphereNormal = (sphere, pos) =>
    Vector.unitVector(Vector.subtract(pos, sphere.point));

const surface = (ray, s, object, pointAtTime, normal) => {
    let lambertAmount = 0;

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

    lambertAmount = Math.min(1, lambertAmount);

    return Vector.add(
        Vector.scale(object.color, lambertAmount * object.lambert),
        Vector.scale(object.color, object.ambient)
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

export default generateNewPixelData;
