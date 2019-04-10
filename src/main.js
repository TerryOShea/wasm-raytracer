import { SCENE, WIDTH, HEIGHT } from './constants';
import generateNewPixelData from './pixel-data';

const canvas = document.getElementById("c");
canvas.width = WIDTH;
canvas.height = HEIGHT;
canvas.style.cssText = "width:" + WIDTH * 2 + "px;height:" + HEIGHT * 2 + "px";

const ctx = canvas.getContext("2d");
const data = ctx.getImageData(0, 0, WIDTH, HEIGHT);

const renderData = pixelData => {
    data.data.set(pixelData);
    ctx.putImageData(data, 0, 0);
};

let useWasm = false;

import("wasm-raytracer").then(wasm => {
    const planet1Pos = { x: -4, y: 2, z: -1 };
    const planet2Pos = { x: -4, y: 3, z: -1 };
    let planet1Acc = 0;
    let planet2Acc = 0;

    const tick = () => {
        planet1Acc += 0.1;
        planet2Acc += 0.2;

        planet1Pos.x = Math.sin(planet1Acc) * 3.5;
        planet1Pos.z = -3 + Math.cos(planet1Acc) * 3.5;
        planet2Pos.x = Math.sin(planet2Acc) * 4;
        planet2Pos.z = -3 + Math.cos(planet2Acc) * 4;

        if (useWasm) {
            renderData(wasm.generate_new_data(planet1Pos, planet2Pos));
        } else {
            SCENE.objects[1].point = planet1Pos;
            SCENE.objects[2].point = planet2Pos;
            renderData(generateNewPixelData(SCENE));
        }

        setTimeout(tick, 1000);
    };

    tick();
});
