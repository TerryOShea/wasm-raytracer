extern crate serde_json;
extern crate wasm_bindgen;

// TODO: look into wasm optimizations
// TODO: do struct traits need to be pub?
// TODO: const_fn?
// TODO: split `add` into `add2`, `add3`

use std::f64;
use wasm_bindgen::prelude::*;

#[macro_use]
extern crate serde_derive;

#[wasm_bindgen]
#[derive(Debug, Serialize, Deserialize)]
pub struct XYZ {
    pub x: f64,
    pub y: f64,
    pub z: f64,
}

const LIGHTS: [XYZ; 1] = [XYZ {
    x: -30.0,
    y: -10.0,
    z: 20.0,
}];

#[derive(Debug)]
pub struct Color {
    pub r: u8,
    pub g: u8,
    pub b: u8,
}

const WHITE: Color = Color {
    r: 255,
    g: 255,
    b: 255,
};

pub struct Camera {
    pub point: XYZ,
    pub field_of_view: f64,
    pub vector: XYZ,
}

pub struct Sphere {
    pub point: XYZ,
    pub color: Color,
    pub lambert: f64,
    pub ambient: f64,
    pub radius: f64,
}

const SUN: Sphere = Sphere {
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

const WIDTH: u32 = 320;
const HEIGHT: u32 = 240;

const CAMERA_POINT: XYZ = XYZ {
    x: 0.0,
    y: 1.8,
    z: 10.0,
};

const CAMERA_VECTOR: XYZ = XYZ {
    x: 0.0,
    y: 3.0,
    z: 0.0,
};

const CAMERA_FIELD_OF_VIEW: f64 = 45.0;
const FOV_RADIANS: f64 = (f64::consts::PI * (CAMERA_FIELD_OF_VIEW / 2.0)) / 180.0;
const HEIGHT_WIDTH_RATIO: f64 = HEIGHT as f64 / WIDTH as f64;

const UP_VECTOR: XYZ = XYZ {
    x: 0.0,
    y: 1.0,
    z: 0.0,
};

const MOON_1_COLOR: Color = Color {
    r: 155,
    g: 155,
    b: 155,
};
const MOON_1_LAMBERT: f64 = 0.9;
const MOON_1_AMBIENT: f64 = 0.0;
const MOON_1_RADIUS: f64 = 0.2;

const MOON_2_COLOR: Color = Color {
    r: 255,
    g: 255,
    b: 255,
};
const MOON_2_LAMBERT: f64 = 0.7;
const MOON_2_AMBIENT: f64 = 0.1;
const MOON_2_RADIUS: f64 = 0.1;

#[wasm_bindgen]
pub fn generate_new_data(planet_1_pos_js: &JsValue, planet_2_pos_js: &JsValue) -> Vec<u8> {
    let planet_1_pos: XYZ = planet_1_pos_js.into_serde().unwrap();
    let planet_2_pos: XYZ = planet_2_pos_js.into_serde().unwrap();

    let planet_1 = Sphere {
        point: planet_1_pos,
        color: MOON_1_COLOR,
        lambert: MOON_1_LAMBERT,
        ambient: MOON_1_AMBIENT,
        radius: MOON_1_RADIUS,
    };
    let planet_2 = Sphere {
        point: planet_2_pos,
        color: MOON_2_COLOR,
        lambert: MOON_2_LAMBERT,
        ambient: MOON_2_AMBIENT,
        radius: MOON_2_RADIUS,
    };

    let eye_vector = unit_vector(&subtract(&CAMERA_VECTOR, &CAMERA_POINT));
    let vp_right = unit_vector(&cross_product(&eye_vector, &UP_VECTOR));
    let vp_up = unit_vector(&cross_product(&vp_right, &eye_vector));
    let half_width = FOV_RADIANS.tan();
    let half_height = HEIGHT_WIDTH_RATIO * half_width;
    let camera_width = half_width * 2.0;
    let camera_height = half_height * 2.0;
    let pixel_width = camera_width / (WIDTH as f64 - 1.0);
    let pixel_height = camera_height / (HEIGHT as f64 - 1.0);

    let mut new_data: Vec<u8> = vec![];
    for x in 0..WIDTH {
        for y in 0..HEIGHT {
            let xcomp = scale(&vp_right, x as f64 * pixel_width - half_width);
            let ycomp = scale(&vp_up, y as f64 * pixel_height - half_height);
            let vector = unit_vector(&add(vec![&eye_vector, &xcomp, &ycomp]));

            let color = color_for_pixel(&vector, &planet_1, &planet_2);
            new_data.extend(&[color.r, color.b, color.g, 255]);
        }
    }

    new_data
}

pub fn color_for_pixel(vector: &XYZ, planet_1: &Sphere, planet_2: &Sphere) -> Color {
    let mut closest_distance = f64::INFINITY;
    let mut closest_sphere: Option<&Sphere> = None;

    let spheres = [planet_1, planet_2, &SUN];
    for sphere in &spheres {
        let current_distance = distance_to_sphere(vector, &CAMERA_POINT, sphere);
        if current_distance < closest_distance {
            closest_distance = current_distance;
            closest_sphere = Some(sphere);
        }
    }

    match closest_sphere {
        Some(s) => {
            let point_at_time = add(vec![&CAMERA_POINT, &scale(vector, closest_distance)]);
            let sphere_normal = unit_vector(&subtract(&point_at_time, &s.point));
            let color = color_of_sphere(s, &sphere_normal, &point_at_time, planet_1, planet_2);
            println!("{:?}", point_at_time);
            println!("{:?}", sphere_normal);
            println!("{:?}", color);
            Color { r: 1, g: 2, b: 3 }
        }
        None => WHITE,
    }
}

pub fn color_of_sphere(
    sphere: &Sphere,
    normal: &XYZ,
    point_at_time: &XYZ,
    planet_1: &Sphere,
    planet_2: &Sphere,
) -> Color {
    let mut lambert: f64 = 0.0;

    for light in LIGHTS.iter() {
        if is_light_visible(point_at_time, &light, planet_1, planet_2) {
            let contribution = dot_product(&unit_vector(&subtract(&light, point_at_time)), normal);
            lambert += contribution.max(0.0);
        }
    }

    lambert = lambert.min(1.0);

    // TODO: there must be a better way?
    let sphere_color_as_xyz = XYZ {
        x: sphere.color.r as f64,
        y: sphere.color.g as f64,
        z: sphere.color.b as f64,
    };

    let computed_color_as_xyz = add(vec![
        &scale(&sphere_color_as_xyz, lambert * &sphere.lambert),
        &scale(&sphere_color_as_xyz, sphere.ambient),
    ]);

    Color {
        r: computed_color_as_xyz.x as u8,
        g: computed_color_as_xyz.y as u8,
        b: computed_color_as_xyz.z as u8,
    }
}

pub fn is_light_visible(
    point_at_time: &XYZ,
    light: &XYZ,
    planet_1: &Sphere,
    planet_2: &Sphere,
) -> bool {
    let vector = unit_vector(&subtract(point_at_time, light));

    let mut closest_distance = f64::INFINITY;
    let spheres = [planet_1, planet_2, &SUN];
    for sphere in &spheres {
        let current_distance = distance_to_sphere(&vector, point_at_time, sphere);
        if current_distance < closest_distance {
            closest_distance = current_distance;
        }
    }

    closest_distance > -0.005
}

pub fn distance_to_sphere(vector: &XYZ, point: &XYZ, sphere: &Sphere) -> f64 {
    let eye_to_center = subtract(&sphere.point, point);
    let v = dot_product(&eye_to_center, &vector);
    let eo_dot = dot_product(&eye_to_center, &eye_to_center);
    let discriminant = &sphere.radius * &sphere.radius - eo_dot + v * v;

    // sphere hasn't been hit by ray
    match discriminant {
        d if d < 0.0 => f64::INFINITY,
        _ => v - discriminant.sqrt(),
    }
}

pub fn cross_product(a: &XYZ, b: &XYZ) -> XYZ {
    XYZ {
        x: a.y * b.z - a.z * b.y,
        y: a.z * b.x - a.x * b.z,
        z: a.x * b.y - a.y * b.x,
    }
}

pub fn dot_product(a: &XYZ, b: &XYZ) -> f64 {
    a.x * b.x + a.y * b.y + a.z * b.z
}

pub fn scale(a: &XYZ, t: f64) -> XYZ {
    XYZ {
        x: a.x * t,
        y: a.y * t,
        z: a.z * t,
    }
}

pub fn length(a: &XYZ) -> f64 {
    (dot_product(a, a)).sqrt()
}

pub fn unit_vector(a: &XYZ) -> XYZ {
    scale(a, 1.0 / length(a))
}

pub fn add(xyzs: Vec<&XYZ>) -> XYZ {
    let mut x_sum = 0.0;
    let mut y_sum = 0.0;
    let mut z_sum = 0.0;

    for xyz in xyzs {
        x_sum += xyz.x;
        y_sum += xyz.y;
        z_sum += xyz.z;
    }

    XYZ {
        x: x_sum,
        y: y_sum,
        z: z_sum,
    }
}

fn subtract(a: &XYZ, b: &XYZ) -> XYZ {
    XYZ {
        x: a.x - b.x,
        y: a.y - b.y,
        z: a.z - b.z,
    }
}
