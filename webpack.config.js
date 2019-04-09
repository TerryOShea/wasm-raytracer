const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname),
    optimization: {
        minimizer: [
            new UglifyJsPlugin({ cache: true, parallel: true, sourceMap: false })
        ]
    },
    entry: {
        main: "./src/main.js"
    },
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, 'dist') 
    },
    resolve: {
        alias: {
            "wasm-raytracer": path.resolve(__dirname, "pkg/wasm_raytracer.js")
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};
