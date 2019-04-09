extern crate serde_json;
extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[macro_use]
extern crate serde_derive;

// TODO: look into wasm optimizations

#[wasm_bindgen]
#[derive(Serialize, Deserialize)]
pub struct Vector {
    pub x: f64,
    pub y: f64,
    pub z: f64,
}

#[wasm_bindgen]
pub fn cross_product(a_js: &JsValue, b_js: &JsValue) -> Vector {
    let a: Vector = a_js.into_serde().unwrap();
    let b: Vector = b_js.into_serde().unwrap();

    Vector {
        x: a.y * b.z - a.z * b.y,
        y: a.z * b.x - a.x * b.z,
        z: a.x * b.y - a.y * b.x,
    }
}

#[wasm_bindgen]
pub fn dot_product(a_js: &JsValue, b_js: &JsValue) -> f64 {
    let a: Vector = a_js.into_serde().unwrap();
    let b: Vector = b_js.into_serde().unwrap();

    a.x * b.x + a.y * b.y + a.z * b.z
}

#[wasm_bindgen]
pub fn scale(a_js: &JsValue, t: f64) -> Vector {
    let a: Vector = a_js.into_serde().unwrap();

    Vector {
        x: a.x * t,
        y: a.y * t,
        z: a.z * t,
    }
}

#[wasm_bindgen]
pub fn length(a_js: &JsValue) -> f64 {
    (dot_product(a_js, a_js) as f64).sqrt()
}

#[wasm_bindgen]
pub fn unit_vector(a_js: &JsValue) -> Vector {
    scale(a_js, 1.0 / length(a_js))
}

// #[wasm_bindgen]
// pub fn add(vectors: Vec<&JsValue>) -> Vector {
//     let mut x_sum = 0.0;
//     let mut y_sum = 0.0;
//     let mut z_sum = 0.0;
//
//     for v_js in vectors {
//         let v: Vector = v_js.into_serde().unwrap();
//         x_sum += v.x;
//         y_sum += v.y;
//         z_sum += v.z;
//     }
//
//     Vector {
//         x: x_sum,
//         y: y_sum,
//         z: z_sum,
//     }
// }

#[wasm_bindgen]
pub fn subtract(a_js: &JsValue, b_js: &JsValue) -> Vector {
    let a: Vector = a_js.into_serde().unwrap();
    let b: Vector = b_js.into_serde().unwrap();

    Vector {
        x: a.x - b.x,
        y: a.y - b.y,
        z: a.z - b.z,
    }
}
