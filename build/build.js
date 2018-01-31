require('./check-versions')();

process.env.NODE_ENV = 'production';

const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const shell = require('shelljs');
const webpack = require('webpack');
const config = require('../config');
const webpackConfig = require('./webpack.prod.conf');

let spinner = ora('building for production...');
spinner.start();

let assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory);
shell.rm('-rf', assetsPath);
shell.mkdir('-p', assetsPath);
shell.config.silent = true;
shell.cp('-R', 'static/*', assetsPath);

// vonic assets
let vonicAssetsPath = path.join(config.build.assetsRoot, 'static', 'vonic');
shell.mkdir('-p', vonicAssetsPath);
shell.cp('-R', 'node_modules/vonic/dist/*', vonicAssetsPath);
shell.config.silent = false;

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    spinner.stop();
    if (err) throw err;
    webpack(webpackConfig, function (err, stats) {
        spinner.stop();
        if (err) throw err;
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n');

        console.log(chalk.cyan('  Build complete.\n'));
        console.log(chalk.yellow(
            '  Tip: built files are meant to be served over an HTTP server.\n' +
            '  Opening index.html over file:// won\'t work.\n'
        ))
    })
});
