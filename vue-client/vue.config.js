module.exports = {
    lintOnSave: false,
    configureWebpack: {
        devServer: {
            proxy: {
                '/api': {
                    target: 'http://localhost:4000',
                },
            },
        },
    }
}
