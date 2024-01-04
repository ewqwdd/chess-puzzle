import { DefinePlugin } from 'webpack'
import { BuildParams } from '../types'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export const buildPlugins = (paths: BuildParams['paths'], isDev: boolean, api: string) => {
	return [
		new HtmlWebpackPlugin({
			template: paths.html
		}),
		new MiniCssExtractPlugin(),
		new DefinePlugin({
			_IS_DEV_: JSON.stringify(isDev),
			_API_: JSON.stringify(api)
		})
	]
}