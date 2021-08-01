function buildConfig(env) {
    // console.log('Goal: ', env.webpack.dist);
    // return require('./build/' + env.webpack.dist + '.js');
    return require('./build/webpack.dist.js');
}

module.exports = buildConfig;