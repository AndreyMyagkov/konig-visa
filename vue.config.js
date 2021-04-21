const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    devServer: {
        overlay: {
            warnings: true,
            errors: true
        }
    },
    lintOnSave: false,
    chainWebpack: config => {
        //config.plugins.delete('prefetch')
        config.module
            .rule('vue')
            .use('vue-loader')
            .tap(args => {
                args.compilerOptions.whitespace = 'preserve'
            })
        config.optimization.delete('splitChunks')

        config.module
            .rule('svg')
            .exclude.add(resolve('src/assets/svg'))
            .end()

        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/assets/svg'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: '[name]'
            })


        // config.output.filename = '[name].js?[chunkhash]';
        // config.output.chunkFilename = '[name].js?[chunkhash]';


    },


}
