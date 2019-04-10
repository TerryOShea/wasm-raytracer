A raytracer that makes use of Rust-generated WebAssembly (WASM).

"WebAssembly is a standard that defines a binary format and a corresponding assembly-like text format for executables used by web pages. The purpose of Wasm is to enable the JavaScript engine of a web browser to **execute page scripts nearly as fast as native machine code**." --[Wikipedia](https://en.wikipedia.org/wiki/WebAssembly)

To test this speed claim, I've adapted [this plain JS raytracer tutorial](https://tmcw.github.io/literate-raytracer/) to use Rust-transpiled WASM instead (see the code in `src/lib.rs`).

![WASM vs. JS](assets/wasm_vs_js.gif)
You can toggle between equivalent code in JavaScript and in WASM--the JS version is demonstrably sluggish.

[See it live!](https://terryoshea.github.io/wasm-raytracer/)
