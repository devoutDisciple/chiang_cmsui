const path = require('path');
const webpackBaseConfig = require('./webpack.base.config');

const webpackDevConfig = {
	devtool: 'inline-source-map',
	mode: 'development',
	cache: true,

	devServer: {
		contentBase: path.join(__dirname, '../dist'),
		compress: true,
		port: 9000,
		bonjour: true, // 广播开发服务器
		hot: true,
		hotOnly: true,
		open: true,
		clientLogLevel: 'none',
		proxy: {
			'/**': {
				target: 'http://localhost:9999',
				changeOrigin: true,
			},
		},
		progress: true,
	},
};

const webpackConfig = { ...webpackBaseConfig('development'), ...webpackDevConfig };

module.exports = webpackConfig;
