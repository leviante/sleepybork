const path = require("path");
//plugins
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

//
//
// const cssModuleLoader = {
//     loader: "css-loader",
//     options: {
//         modules: {
//             localIdentName: "[name]_[local]_[hash:base64:6]",
//         },
//         localsConvention: "camelCase",
//         sourceMap: false
// //     }
// // };

const postcssLoader = {
    loader: "postcss-loader",
    options: {
        postcssOptions: {
            config: path.join(__dirname, "/postcss.config.js"),

        }
    }
};

module.exports = {
    entry: {
        package: "./lib/index.js"
    },
    output: {
        filename: "bundle.js",
        path: path.resolve("./dist"),
        library: "berk",
        libraryTarget: "umd"
    },
    mode: "production",
    devtool: false,
    module: {
        rules: [
            // {
            //     test: /\.(woff(2)?|ttf|eot|png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/,
            //     use: [{
            //         loader: 'url-loader',
            //         options: {
            //             fallback: 'file-loader',
            //             name: '[name].[ext]'
            //         }
            //     }]
            // },
            // {
            //     test: /\.svg$/,
            //     use: [{
            //         loader: 'svg-url-loader',
            //         options: {
            //             limit: 4096,
            //             name: '[name].[ext]'
            //         }
            //     }]
            // },
            {
                test: /\.css$/,
                use: [
                    ExtractCssChunks.loader,
                    // cssModuleLoader,
                    "postcss-loader"
                ]
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        ["@babel/preset-env", {targets: {browsers: ["last 2 versions"]}}],
                        ["@babel/preset-react", {runtime: "automatic"}]
                    ],
                    plugins: [
                        "@babel/plugin-transform-runtime",
                        "@babel/plugin-syntax-dynamic-import",
                        "@babel/plugin-proposal-object-rest-spread",
                        "@babel/plugin-proposal-class-properties",
                        "@babel/plugin-proposal-export-default-from"
                    ]
                }
            },
            {
                test: /\.s[a|c]ss$/,
                use: [
                    ExtractCssChunks.loader,
                    // cssModuleLoader,
                    "css-loader",
                    postcssLoader,
                    "sass-loader"
                ]
            },
            {parser: {system: false}}
        ]
    },
    resolve: {
        extensions: [".js", ".css", ".json"],
        modules: [
            __dirname,
            'node_modules',
        ],
    },
    externals: [
        "react"
    ],
    plugins: [
        new CleanWebpackPlugin({
            verbose: true
        }),
        new ExtractCssChunks(),
        new CompressionPlugin({
            algorithm: "gzip"
        })
    ]
};