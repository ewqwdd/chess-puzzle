import { DefinePlugin } from 'webpack'
import { BuildParams } from '../types'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import path from 'path'

export const buildPlugins = (paths: BuildParams['paths'], isDev: boolean, api: string) => {
	return [
		new HtmlWebpackPlugin({
			template: paths.html,
			meta: {
				'og:image': { property: 'og:image', content: path.resolve(paths.public, 'preview.png') },
			}
		}),
		new MiniCssExtractPlugin(),
		new DefinePlugin({
			_IS_DEV_: JSON.stringify(isDev),
			_API_: JSON.stringify(api)
		}),
		new CopyPlugin({
			patterns: [
				{ from: paths.public, to: '' } //to the dist root directory
			],
		}),
	]
}