module.exports = {
    //close eslint checking
	lintOnSave: false,
	devServer: {
		proxy: {
			'/api/v1': {
				target: 'http://localhost:5000',
				ws: true,
				changeOrigin: true,
				pathRewrite: {'^/api/v1': ''}
			},
			'/api/v2': {
				target: 'http://localhost:5001',
				ws: true,
				changeOrigin: true,
				pathRewrite: {'^/api/v2': ''}
			}
		}
	}
}