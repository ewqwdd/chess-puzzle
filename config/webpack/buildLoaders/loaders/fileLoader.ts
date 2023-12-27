export const fileLoader = {
	test: /\.(png|jpe?g|gif|wav)$/i,
	use: [
		{
			loader: 'file-loader'
		}
	]
}