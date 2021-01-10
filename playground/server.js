//libraries
const express = require('express');
const path = require('path');

//global variables
const ENV = process.env.TARGET_ENV;

//init server
const app = express();

//init webpack
const webpack = require('webpack');


const webpackConfig = require('./webpack.dev.config');
const compiler = webpack(webpackConfig);

const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

app.get('*', function (req, res) {
    const filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, function (err, result) {
        if (err) {
            console.log(err);
        }
        res.set('content-type', 'text/html');
        res.send(result);
        res.end();
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Target env is ${ENV}`);
    console.log(`Sleepybork module playground is listening on port ${PORT}!`);
});
