use super::constants::XYZ;

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

pub fn subtract(a: &XYZ, b: &XYZ) -> XYZ {
    XYZ {
        x: a.x - b.x,
        y: a.y - b.y,
        z: a.z - b.z,
    }
}

fn length(a: &XYZ) -> f64 {
    (dot_product(a, a)).sqrt()
}
