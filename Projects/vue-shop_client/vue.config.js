module.exports = {
    //close eslint checking
	lintOnSave: false,
	devServer: {
		proxy: {
			'/graphql': {
				target: 'http://localhost:4000',
				ws: true,
				changeOrigin: true,
				//pathRewrite: {'^/graphql': ''}
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