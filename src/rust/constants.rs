extern crate serde_json;
extern crate wasm_bindgen;

use std::f64;
use wasm_bindgen::prelude::*;

// TODO: look into const_fn when more stable

#[wasm_bindgen]
#[derive(Debug, Serialize, Deserialize)]
pub struct XYZ {
    pub x: f64,
    pub y: f64,
    pub z: f64,
}

pub const LIGHTS: [XYZ; 1] = [XYZ {
    x: -30.0,
    y: -10.0,
    z: 20.0,
}];

#[derive(Debug)]
pub struct Color {
    pub r: u16,
    pub g: u16,
    pub b: u16,
}

pub const WHITE: Color = Color {
    r: 255,
    g: 255,
    b: 255,
};

#[derive(Debug)]
pub struct Sphere {
    pub point: XYZ,
    pub color: Color,
    pub lambert: f64,
    pub ambient: f64,
    pub radius: f64,
}

pub const SUN: Sphere = Sphere {
    point: XYZ {
        x: 0.0,
        y: 3.5,
        z: -3.0,
    },
    color: Color {
        r: 255,
        g: 230,
        b: 0,
    },
    lambert: 0.7,
    ambient: 0.5,
    radius: 3.0,
};

pub const WIDTH: u32 = 320;
pub const HEIGHT: u32 = 240;

pub const CAMERA_POINT: XYZ = XYZ {
    x: 0.0,
    y: 1.8,
    z: 10.0,
};

pub const CAMERA_VECTOR: XYZ = XYZ {
    x: 0.0,
    y: 3.0,
    z: 0.0,
};

pub const CAMERA_FIELD_OF_VIEW: f64 = 45.0;
pub const FOV_RADIANS: f64 = (f64::consts::PI * (CAMERA_FIELD_OF_VIEW / 2.0)) / 180.0;
pub const HEIGHT_WIDTH_RATIO: f64 = HEIGHT as f64 / WIDTH as f64;

pub const UP_VECTOR: XYZ = XYZ {
    x: 0.0,
    y: 1.0,
    z: 0.0,
};

pub const MOON_1_COLOR: Color = Color {
    r: 153,
    g: 102,
    b: 255,
};
pub const MOON_1_LAMBERT: f64 = 0.9;
pub const MOON_1_AMBIENT: f64 = 0.5;
pub const MOON_1_RADIUS: f64 = 0.2;

pub const MOON_2_COLOR: Color = Color {
    r: 255,
    g: 255,
    b: 255,
};
pub const MOON_2_LAMBERT: f64 = 0.7;
pub const MOON_2_AMBIENT: f64 = 0.5;
pub const MOON_2_RADIUS: f64 = 0.1;
