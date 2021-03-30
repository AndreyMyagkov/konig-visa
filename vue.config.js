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

        // config.output.filename = '[name].js?[chunkhash]';
        // config.output.chunkFilename = '[name].js?[chunkhash]';


    },

}
