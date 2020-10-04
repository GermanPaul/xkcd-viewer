module.exports = {
    lintOnSave: false,
    configureWebpack: {
        devServer: {
            proxy: {
                '/proxy': {
                    target: 'http://localhost:4000',
                },
            },
        },
    }
}
