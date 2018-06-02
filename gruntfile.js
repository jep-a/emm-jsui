const path = require('path');
const BabelEnginePlugin = require('babel-engine-plugin');

module.exports = function(grunt) {
	const dev = !grunt.option('production');

	require('load-grunt-tasks')(grunt);

	const babelPresetEnv = ['env', {
		targets: {
			browsers: ['last 2 versions']
		}
	}]

	grunt.initConfig({
		webpack: {
			dist: {
				mode: dev ? 'development' : 'production',
				devtool: dev && 'source-map',
				entry: './src/js/index.js',
				output: {
					path: path.resolve(__dirname, 'public'),
					filename: 'bundle.min.js'
				},
				plugins: [
					new BabelEnginePlugin({
						presets: [babelPresetEnv]
					})
				],
				module: {
					rules: [{
						test: /\.js$/,
						exclude: /node_modules/,
						loader: 'babel-loader',
						options: {
							sourceMaps: dev,
							presets: [
								'react',
								babelPresetEnv,
								'stage-1'
							],
							plugins: [
								'transform-decorators-legacy'
							]
						}
					}]
				}
			}
		},

		sass: {
			dist: {
				files: {
					'./public/assets/css/style.css': './src/sass/index.sass'
				}
			}
		},

		watch: {
			config: {
				files: __filename,
				tasks: ['init'],
				options: {
					reload: true
				}
			},
			js: {
				files: [
					'./node_modules/react-inlinesvg/**/*.js',
					'./src/js/**/*.js'
				],
				tasks: ['webpack'],
				options: {
					livereload: dev
				}
			},
			sass: {
				files: './src/sass/**/*.sass',
				tasks: ['sass'],
				options: {
					livereload: dev
				}
			}
		}
	});

	grunt.registerTask('init', ['webpack', 'sass']);
	grunt.registerTask('default', ['init', 'watch']);
}