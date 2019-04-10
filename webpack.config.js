const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname),
    entry: "./src/main.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/"
    },
    optimization: {
        minimizer: [
            new TerserPlugin()
        ]
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
