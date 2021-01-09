const path = require("path");
//plugins
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
//utils
const pkg = require(path.resolve("./package.json"));
const COMPONENT_NAME = pkg.name.split("/")[1];

const cssLoader = {
    loader: "css-loader",
    options: {
        modules: {
            auto: true,
            compileType: "module",
            mode: "local",
            localIdentName: "[hash:base64:5]",
            exportLocalsConvention: "camelCase"
        }
    }
};

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
        [COMPONENT_NAME]: "./lib/index.js"
    },
    output: {
        filename: `${COMPONENT_NAME}.min.js`,
        path: path.resolve("./dist"),
        library: pkg.name,
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
                    cssLoader,
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
                    cssLoader,
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
        new ExtractCssChunks({
            filename: "[name].min.css"
        }),
        new CompressionPlugin({
            algorithm: "gzip"
        })
    ]
};