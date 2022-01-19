const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app
        .use(
            '/backend',
            createProxyMiddleware({
                // target: 'http://th2-qa:30000/',
                target: 'http://10.44.17.234:8082/',
                changeOrigin: true,
                secure: false,
            }),
        );
};