extern crate serde_json;
extern crate wasm_bindgen;

// TODO: look into WASM optimizations for production

use std::f64;
use wasm_bindgen::prelude::*;

mod rust;
use rust::{
    constants,
    constants::{Color, Sphere, XYZ},
    vector,
};

#[macro_use]
extern crate serde_derive;

#[wasm_bindgen]
pub fn generate_new_data(planet_1_pos_js: &JsValue, planet_2_pos_js: &JsValue) -> Vec<u16> {
    let planet_1_pos: XYZ = planet_1_pos_js.into_serde().unwrap();
    let planet_2_pos: XYZ = planet_2_pos_js.into_serde().unwrap();

    let planet_1 = Sphere {
        point: planet_1_pos,
        color: constants::MOON_1_COLOR,
        lambert: constants::MOON_1_LAMBERT,
        ambient: constants::MOON_1_AMBIENT,
        radius: constants::MOON_1_RADIUS,
    };
    let planet_2 = Sphere {
        point: planet_2_pos,
        color: constants::MOON_2_COLOR,
        lambert: constants::MOON_2_LAMBERT,
        ambient: constants::MOON_2_AMBIENT,
        radius: constants::MOON_2_RADIUS,
    };

    let eye_vector = vector::unit_vector(&vector::subtract(
        &constants::CAMERA_VECTOR,
        &constants::CAMERA_POINT,
    ));
    let vp_right = vector::unit_vector(&vector::cross_product(&eye_vector, &constants::UP_VECTOR));
    let vp_up = vector::unit_vector(&vector::cross_product(&vp_right, &eye_vector));
    let half_width = constants::FOV_RADIANS.tan();
    let half_height = constants::HEIGHT_WIDTH_RATIO * half_width;
    let camera_width = half_width * 2.0;
    let camera_height = half_height * 2.0;
    let pixel_width = camera_width / (constants::WIDTH as f64 - 1.0);
    let pixel_height = camera_height / (constants::HEIGHT as f64 - 1.0);

    let mut new_data: Vec<u16> = vec![];
    for row in 0..constants::HEIGHT {
        for col in 0..constants::WIDTH {
            let rowcomp = vector::scale(&vp_up, row as f64 * pixel_height - half_height);
            let colcomp = vector::scale(&vp_right, col as f64 * pixel_width - half_width);
            let vector = vector::unit_vector(&vector::add(vec![&eye_vector, &rowcomp, &colcomp]));

            let color = color_for_pixel(&vector, &planet_1, &planet_2);
            new_data.extend(&[color.r, color.g, color.b, 255]);
        }
    }

    new_data
}

pub fn color_for_pixel(vector: &XYZ, planet_1: &Sphere, planet_2: &Sphere) -> Color {
    let mut closest_distance = f64::INFINITY;
    let mut closest_sphere: Option<&Sphere> = None;

    let spheres = [planet_1, planet_2, &constants::SUN];
    for sphere in &spheres {
        let current_distance = distance_to_sphere(vector, &constants::CAMERA_POINT, sphere);
        if current_distance < closest_distance {
            closest_distance = current_distance;
            closest_sphere = Some(sphere);
        }
    }

    match closest_sphere {
        Some(s) => {
            let point_at_time = vector::add(vec![
                &constants::CAMERA_POINT,
                &vector::scale(vector, closest_distance),
            ]);
            let sphere_normal = vector::unit_vector(&vector::subtract(&point_at_time, &s.point));
            color_of_sphere(s, &sphere_normal, &point_at_time, planet_1, planet_2)
        }
        None => constants::WHITE,
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

    for light in constants::LIGHTS.iter() {
        if is_light_visible(point_at_time, &light, planet_1, planet_2) {
            let contribution = vector::dot_product(
                &vector::unit_vector(&vector::subtract(&light, point_at_time)),
                normal,
            );
            if contribution > 0.0 {
                lambert += contribution;
            }
        }
    }

    lambert = lambert.min(1.0);

    // TODO: there must be a better way?
    let sphere_color_as_xyz = XYZ {
        x: sphere.color.r as f64,
        y: sphere.color.g as f64,
        z: sphere.color.b as f64,
    };

    let computed_color_as_xyz = vector::add(vec![
        &vector::scale(&sphere_color_as_xyz, lambert * &sphere.lambert),
        &vector::scale(&sphere_color_as_xyz, sphere.ambient),
    ]);

    Color {
        r: computed_color_as_xyz.x as u16,
        g: computed_color_as_xyz.y as u16,
        b: computed_color_as_xyz.z as u16,
    }
}

pub fn is_light_visible(
    point_at_time: &XYZ,
    light: &XYZ,
    planet_1: &Sphere,
    planet_2: &Sphere,
) -> bool {
    let vector = vector::unit_vector(&vector::subtract(point_at_time, light));

    let mut closest_distance = f64::INFINITY;
    let spheres = [planet_1, planet_2, &constants::SUN];
    for sphere in &spheres {
        let current_distance = distance_to_sphere(&vector, point_at_time, sphere);
        if current_distance < closest_distance {
            closest_distance = current_distance;
        }
    }

    closest_distance > -0.005
}

pub fn distance_to_sphere(vector: &XYZ, point: &XYZ, sphere: &Sphere) -> f64 {
    let eye_to_center = vector::subtract(&sphere.point, point);
    let v = vector::dot_product(&eye_to_center, &vector);
    let eo_dot = vector::dot_product(&eye_to_center, &eye_to_center);
    let discriminant = &sphere.radius * &sphere.radius - eo_dot + v * v;

    // sphere isn't hit by ray
    match discriminant {
        d if d < 0.0 => f64::INFINITY,
        _ => v - discriminant.sqrt(),
    }
}

#[cfg(test)]
mod tests;
