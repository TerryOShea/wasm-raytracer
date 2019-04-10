use super::*;

impl PartialEq for XYZ {
    fn eq(&self, other: &XYZ) -> bool {
        self.x == other.x && self.y == other.y && self.z == other.z
    }
}

#[test]
fn test_scale() {
    let vector = XYZ {
        x: 4.0,
        y: 5.0,
        z: 6.0,
    };
    assert_eq!(
        scale(&vector, 2.0),
        XYZ {
            x: 8.0,
            y: 10.0,
            z: 12.0
        },
    );
}

#[test]
fn test_cross_product() {
    let vector_1 = XYZ {
        x: 4.0,
        y: 5.0,
        z: 6.0,
    };
    let vector_2 = XYZ {
        x: 9.0,
        y: 8.0,
        z: 7.0,
    };

    assert_eq!(
        cross_product(&vector_1, &vector_2),
        XYZ {
            x: -13.0,
            y: 26.0,
            z: -13.0
        },
    );
}

#[test]
fn test_subtract() {
    let vector_1 = XYZ {
        x: 4.0,
        y: 5.0,
        z: 6.0,
    };
    let vector_2 = XYZ {
        x: 9.0,
        y: 8.0,
        z: 7.0,
    };

    assert_eq!(
        subtract(&vector_2, &vector_1),
        XYZ {
            x: 5.0,
            y: 3.0,
            z: 1.0
        },
    );
}

#[test]
fn test_dot_product() {
    let vector_1 = XYZ {
        x: 4.0,
        y: 5.0,
        z: 6.0,
    };
    let vector_2 = XYZ {
        x: 9.0,
        y: 8.0,
        z: 7.0,
    };

    assert_eq!(dot_product(&vector_1, &vector_2), 118.0);
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
