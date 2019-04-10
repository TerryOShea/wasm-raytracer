import * as Vector from "./vector";

const WIDTH = 320;
const HEIGHT = 240;

const canvas = document.getElementById("c");
canvas.width = WIDTH;
canvas.height = HEIGHT;
canvas.style.cssText = "width:" + WIDTH * 2 + "px;height:" + HEIGHT * 2 + "px";

const ctx = canvas.getContext("2d");
const data = ctx.getImageData(0, 0, WIDTH, HEIGHT);

import("wasm-raytracer").then(wasm => {
    const planet1Pos = { x: -4, y: 2, z: -1 };
    const planet2Pos = { x: -4, y: 3, z: -1 };
    let planet1Inc = 0;
    let planet2Inc = 0;

    const future_tick = () => {
        planet1Inc += 0.1;
        planet2Inc += 0.2;

        planet1Pos.x = Math.sin(planet1Inc) * 3.5;
        planet1Pos.z = -3 + Math.cos(planet1Inc) * 3.5;
        planet2Pos.x = Math.sin(planet2Inc) * 4;
        planet2Pos.z = -3 + Math.cos(planet2Inc) * 4;

        data.data.set(wasm.generate_new_data(planet1Pos, planet2Pos));
        ctx.putImageData(data, 0, 0);
        setTimeout(future_tick, 10);
    }

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
        },
    ];

    scene.objects = [
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
                x: 155,
                y: 155,
                z: 155
            },
            lambert: 0.9,
            ambient: 0.0,
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
            ambient: 0.1,
            radius: 0.1
        }
    ];

    let printct = 0;

    const render = s => {
        const { camera } = s;

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

        let index, color;
        const ray = {
            point: camera.point
        };

        let idx = 0;

        for (let row = 0; row < HEIGHT; row++) {
            for (let col = 0; col < WIDTH; col++) {
                const rowcomp = Vector.scale(vpUp, row * pixelHeight - halfHeight);
                const colcomp = Vector.scale(vpRight, col * pixelWidth - halfWidth);

                ray.vector = Vector.unitVector(Vector.add(eyeVector, rowcomp, colcomp));

                color = trace(ray, s);
                data.data[idx + 0] = color.x;
                data.data[idx + 1] = color.y;
                data.data[idx + 2] = color.z;
                data.data[idx + 3] = 255;
                idx += 4;
            }
        }
        
        ctx.putImageData(data, 0, 0);
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

    let planet1 = 0;
    let planet2 = 0;

    const tick = () => {
        render(scene);

        // planet1 += 0.1;
        // planet2 += 0.2;

        // scene.objects[1].point.x = Math.sin(planet1) * 3.5;
        // scene.objects[1].point.z = -3 + Math.cos(planet1) * 3.5;

        // scene.objects[2].point.x = Math.sin(planet2) * 4;
        // scene.objects[2].point.z = -3 + Math.cos(planet2) * 4;

        // setTimeout(tick, 10);
    };

    future_tick();
});
