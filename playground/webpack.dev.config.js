const path = require("path");
const webpack = require("webpack");
//plugins
const HTMLWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

const cssLoader = (isModule = false) =>  ({
    loader: "css-loader",
    options: {
        modules: isModule ? {
            mode: "local",
            localIdentName: "[hash:base64:5]",
            exportLocalsConvention: "camelCase",
            compileType: "module"
        } : false
    }
});

const styleLoaders = ({isModule = false, isPreProcessor = false} = {}) => ([
    ExtractCssChunks.loader,
    cssLoader(isModule),
    isPreProcessor && "sass-loader"
].filter(Boolean))

module.exports = {
    entry: {
        root: ["webpack-hot-middleware/client", "./src/index.js"]
    },
    output: {
        filename: `[name].js`,
        publicPath: "/",
        path: path.resolve("./dist"),
        libraryTarget: "umd"
    },
    mode: "development",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(woff(2)?|ttf|eot|png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        fallback: 'file-loader',
                        name: '[name].[ext]'
                    }
                }]
            },
            {
                test: /\.svg$/,
                use: [{
                    loader: 'svg-url-loader',
                    options: {
                        limit: 4096,
                        name: '[name].[ext]'
                    }
                }]
            },
            {
                test: /\.css$/,
                oneOf: [
                    {
                        include: /node_modules/,
                        use: styleLoaders()
                    },
                    {
                        exclude: /node_modules/,
                        use: styleLoaders({isModule: true})
                    }
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
                use: styleLoaders({isModule: true, isPreProcessor: true})
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
    plugins: [
        new CleanWebpackPlugin({
            verbose: true
        }),
        new HTMLWebpackPlugin({
            template: "./index.html",
            filename: path.resolve(__dirname, './dist') + "/index.html"
        }),
        new ExtractCssChunks({
            filename: "[name].min.css"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CompressionPlugin({
            algorithm: "gzip"
        })
    ]
};