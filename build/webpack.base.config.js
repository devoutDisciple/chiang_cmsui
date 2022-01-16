const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonLessLoad = [
	{
		loader: 'css-loader',
		options: {
			modules: {
				localIdentName: '[path]__[local]--[hash:base64:5]',
				exportGlobals: true,
			},
		},
	},
	{
		loader: 'less-loader',
		options: {
			sourceMap: false,
			lessOptions: {
				javascriptEnabled: true,
			},
		},
	},
];

module.exports = (mode) => {
	const env = mode === 'development';
	if (env) {
		commonLessLoad.unshift({ loader: 'style-loader' });
	} else {
		commonLessLoad.unshift({
			loader: MiniCssExtractPlugin.loader,
			options: {
				esModule: false,
				modules: { namedExport: true },
				publicPath: (resourcePath, context) => `${path.relative(path.dirname(resourcePath), context)}/`,
			},
		});
	}
	return {
		entry: {
			main: path.resolve(__dirname, '../src/index.jsx'),
		},
		output: {
			path: path.resolve(__dirname, '../dist'),
			filename: env ? '[name].js' : '[name].[contenthash].js',
		},
		module: {
			rules: [
				{
					test: /\.jsx|js?$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						},
					},
				},
				{
					test: /\.css?$/,
					exclude: /(node_modules|bower_components)/,
					use: [
						{
							loader: 'style-loader',
						},
						{
							loader: 'css-loader',
						},
					],
				},
				{
					test: /\.css?$/,
					include: /(node_modules|bower_components)/,
					use: [
						{
							loader: 'style-loader',
						},
						{
							loader: 'css-loader',
						},
					],
				},
				{
					test: /\.less|sass?$/,
					exclude: /(node_modules|bower_components)/,
					use: [...commonLessLoad],
				},
				{
					test: /\.(png|jpe?g|gif)$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
						},
					},
				},
			],
		},
		resolve: {
			extensions: ['.jsx', '.js', '.less', '.css', '.json'],
			alias: {
				'@component': path.resolve(__dirname, '../src/component'),
				'@views': path.resolve(__dirname, '../src/views'),
				'@menu': path.resolve(__dirname, '../src/menu'),
				'@utils': path.resolve(__dirname, '../src/utils'),
				'@config': path.resolve(__dirname, '../src/config'),
				'@service': path.resolve(__dirname, '../src/service'),
				'@store': path.resolve(__dirname, '../src/store'),
				'@asserts': path.resolve(__dirname, '../src/asserts'),
				'@router': path.resolve(__dirname, '../src/router'),
				'@constant': path.resolve(__dirname, '../src/constant'),
			},
		},
		plugins: [
			new HtmlWebpackPlugin({
				title: 'omoschool',
				template: path.resolve(__dirname, '../index.html'),
				filename: 'index.html',
				hash: true,
				minify: true,
			}),
			new webpack.NoEmitOnErrorsPlugin(), // 允许js出错不中断服务
		],
	};
};
