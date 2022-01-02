const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpackBase = require('./webpack.base.config');

const webpackBaseConfig = webpackBase('production');

const webpackProdConfig = {
	mode: 'production',
	optimization: {
		runtimeChunk: {
			name: 'runtime',
		},
		mangleWasmImports: true,
		removeAvailableModules: true,
		sideEffects: true,
		splitChunks: {
			chunks: 'all',
			minSize: 30000,
			maxSize: 200000,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '.',
			automaticNameMaxLength: 30,
			name: true,
			cacheGroups: {
				commons: {
					name: 'commons',
					chunks: 'initial',
					minChunks: 2,
				},
				antd: {
					test: /[\\/]antd[\\/]/,
					name: 'antd',
					chunks: 'all',
				},
				echarts: {
					test: /[\\/]echarts[\\/]/,
					name: 'echarts',
					chunks: 'all',
				},
				reactLib: {
					test: /[\\/](react|react-dom)[\\/]/,
					name: 'reactLib',
					chunks: 'all',
				},
			},
		},
	},
};

const plugins = [
	...webpackBaseConfig.plugins,
	new CleanWebpackPlugin(path.resolve(__dirname, '../dist'), {
		root: path.resolve(__dirname, '../'),
		exclude: 'a.js',
		verbose: true,
		dry: false,
	}),
	new MiniCssExtractPlugin({
		filename: '[name].[contenthash].css',
		chunkFilename: '[id].css',
	}),
	new UglifyJSPlugin(),
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify('production'),
	}),
];

const webpackConfig = { ...webpackBaseConfig, ...webpackProdConfig, plugins };

module.exports = webpackConfig;
