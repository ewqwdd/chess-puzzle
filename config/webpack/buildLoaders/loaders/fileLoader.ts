export const fileLoader = {
    test: /\.(png|jpe?g|gif)$/i,
    use: [
        {
            loader: 'file-loader'
        }
    ]
}