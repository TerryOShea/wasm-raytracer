A raytracer that makes use of Rust-generated WebAssembly (WASM).

WebAssembly is a kind of supplement to regular JS that can "**execute...nearly as fast as native machine code**." --[Wikipedia](https://en.wikipedia.org/wiki/WebAssembly) (or read more on [Mozilla](https://developer.mozilla.org/en-US/docs/WebAssembly))

To test this speed claim, I've adapted [this regular JS raytracer tutorial](https://tmcw.github.io/literate-raytracer/) to use Rust-transpiled WASM instead (see the code in `src/lib.rs`).

![WASM vs. JS](assets/wasm_vs_js.gif)

You can toggle between equivalent code in JavaScript and in WASM--the JS version is demonstrably sluggish.

[See it live!](https://terryoshea.github.io/wasm-raytracer/)
