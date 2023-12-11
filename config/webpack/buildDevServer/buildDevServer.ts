export const buildDeServer = (port: number) => {
    return {
        port,
        open: true,
        hot: true,
        liveReload: true,
        historyApiFallback: true
    }
}