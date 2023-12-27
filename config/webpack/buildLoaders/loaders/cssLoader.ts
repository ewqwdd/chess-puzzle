import MiniCssExtractPlugin from 'mini-css-extract-plugin'


export const cssLoader = (isDev: boolean) => {

	return {
		test: /\.less$/i,
		use: [
			// compiles Less to CSS
			isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
			'css-loader',
			'less-loader',
		],
	}
    
}