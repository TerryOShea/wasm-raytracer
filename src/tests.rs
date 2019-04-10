use super::*;

#[test]
fn test_is_light_visible() {
    assert!(true);
}

#[test]
fn test_distance_to_sphere() {
    let vector = XYZ {
        x: 2.0,
        y: 2.0,
        z: 2.0,
    };
    let point_1 = XYZ {
        x: -1.0,
        y: -1.0,
        z: -1.0,
    };
    let point_2 = XYZ {
        x: 12.0,
        y: -12.0,
        z: 12.0,
    };
    let sphere = Sphere {
        radius: 3.0,
        point: XYZ {
            x: 3.0,
            y: 3.0,
            z: 3.0,
        },
        lambert: 0.5,
        ambient: 0.5,
        color: Color {
            r: 255,
            g: 255,
            b: 255,
        },
    };
    let dist_1 = distance_to_sphere(&vector, &point_1, &sphere);
    assert_eq!(dist_1, 0.8267395474870654);
    let dist_2 = distance_to_sphere(&vector, &point_2, &sphere);
    assert_eq!(dist_2, f64::INFINITY);
}
