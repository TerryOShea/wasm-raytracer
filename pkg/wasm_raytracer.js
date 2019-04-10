import * as wasm from './wasm_raytracer_bg';

const heap = new Array(32);

heap.fill(undefined);

heap.push(undefined, null, true, false);

let stack_pointer = 32;

function addBorrowedObject(obj) {
    if (stack_pointer == 1) throw new Error('out of js stack');
    heap[--stack_pointer] = obj;
    return stack_pointer;
}

let cachegetUint16Memory = null;
function getUint16Memory() {
    if (cachegetUint16Memory === null || cachegetUint16Memory.buffer !== wasm.memory.buffer) {
        cachegetUint16Memory = new Uint16Array(wasm.memory.buffer);
    }
    return cachegetUint16Memory;
}

function getArrayU16FromWasm(ptr, len) {
    return getUint16Memory().subarray(ptr / 2, ptr / 2 + len);
}

let cachedGlobalArgumentPtr = null;
function globalArgumentPtr() {
    if (cachedGlobalArgumentPtr === null) {
        cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
    }
    return cachedGlobalArgumentPtr;
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}
/**
* @param {any} planet_1_pos_js
* @param {any} planet_2_pos_js
* @returns {Uint16Array}
*/
export function generate_new_data(planet_1_pos_js, planet_2_pos_js) {
    const retptr = globalArgumentPtr();
    try {
        wasm.generate_new_data(retptr, addBorrowedObject(planet_1_pos_js), addBorrowedObject(planet_2_pos_js));
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];

        const realRet = getArrayU16FromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 2);
        return realRet;


    } finally {
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;

    }

}

let cachedTextEncoder = new TextEncoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

let WASM_VECTOR_LEN = 0;

let passStringToWasm;
if (typeof cachedTextEncoder.encodeInto === 'function') {
    passStringToWasm = function(arg) {

        let size = arg.length;
        let ptr = wasm.__wbindgen_malloc(size);
        let writeOffset = 0;
        while (true) {
            const view = getUint8Memory().subarray(ptr + writeOffset, ptr + size);
            const { read, written } = cachedTextEncoder.encodeInto(arg, view);
            arg = arg.substring(read);
            writeOffset += written;
            if (arg.length === 0) {
                break;
            }
            ptr = wasm.__wbindgen_realloc(ptr, size, size * 2);
            size *= 2;
        }
        WASM_VECTOR_LEN = writeOffset;
        return ptr;
    };
} else {
    passStringToWasm = function(arg) {

        const buf = cachedTextEncoder.encode(arg);
        const ptr = wasm.__wbindgen_malloc(buf.length);
        getUint8Memory().set(buf, ptr);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    };
}

function getObject(idx) { return heap[idx]; }

export function __wbindgen_json_serialize(idx, ptrptr) {
    const ptr = passStringToWasm(JSON.stringify(getObject(idx)));
    getUint32Memory()[ptrptr / 4] = ptr;
    return WASM_VECTOR_LEN;
}

let cachedTextDecoder = new TextDecoder('utf-8');

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

export function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}

function freeXYZ(ptr) {

    wasm.__wbg_xyz_free(ptr);
}
/**
*/
export class XYZ {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        freeXYZ(ptr);
    }

    /**
    * @returns {number}
    */
    get x() {
        return wasm.__wbg_get_xyz_x(this.ptr);
    }
    set x(arg0) {
        return wasm.__wbg_set_xyz_x(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get y() {
        return wasm.__wbg_get_xyz_y(this.ptr);
    }
    set y(arg0) {
        return wasm.__wbg_set_xyz_y(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get z() {
        return wasm.__wbg_get_xyz_z(this.ptr);
    }
    set z(arg0) {
        return wasm.__wbg_set_xyz_z(this.ptr, arg0);
    }
}

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

export function __wbindgen_object_drop_ref(i) { dropObject(i); }

