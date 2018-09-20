/* global __dirname */
import * as webpack from 'webpack';
import { resolve } from 'path';
import HtmlWebpackPlugin = require('html-webpack-plugin');
import WorkboxPlugin = require('workbox-webpack-plugin');
import ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const config: webpack.Configuration = {
	mode:'development',
	stats: {
		warnings: true
	},
	entry: [
		'webpack-hot-middleware/client?path=/__hmr&reload=true&timeout=2000',
		'./src/app/index.tsx'
	],
	output: {
		path: resolve(__dirname, 'dist'),
		filename: 'app.bundle.js',
		publicPath: '/'
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.(j|t)sx?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						cacheDirectory: true,
						babelrc: false,
						presets: [
							[
								"@babel/preset-env",
								{ targets: { browsers: "last 2 versions" } } // or whatever your project requires
							],
							"@babel/preset-typescript",
							"@babel/preset-react"
						],
						plugins: [
							"react-hot-loader/babel",
						]
					}
				}
			}
		]
	},
	plugins: [
		new WorkboxPlugin.InjectManifest({
			swDest: './service-worker.js',
			swSrc: './src/app/sw/index.js'
		}),
		new ForkTsCheckerWebpackPlugin(),
    	new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			title: 'React / Node Boilerplate',
			template: './src/app/assets/index.html',
			favicon: './src/app/assets/favicon.png',
			inject: 'body',
			files: {
				js: ['dist/app.bundle.js'],
				css: ['semantic/semantic.min.css']
			}
		})
	],
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.css', 'json']
	}
};

export default config;
