module.exports = {
        entry: {
            'app': ['./src/rgpm.js', './src/cryptoFactory']
        },
        output: {
            filename: 'bundle.min.js',
            library: 'app'
        },
        mode: 'production'
    }
    