module.exports = {
    //close eslint checking
	lintOnSave: false,
	devServer: {
		proxy: {
			'/api/v1': {
				target: 'http://localhost:4000',
				ws: true,
				changeOrigin: true,
				//pathRewrite: {'^/api/v1': ''}
			},
			// '/api/v2': {
			// 	target: 'http://localhost:4001',
			// 	ws: true,
			// 	changeOrigin: true,
			// 	pathRewrite: {'^/api/v2': ''}
			// }
		}
	}
}