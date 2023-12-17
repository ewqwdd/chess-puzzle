import App from 'app/App'
import StoreProvider from 'app/store/ui/StoreProvider'
import 'app/styles/globals.less'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'shared/context/theme'
import {BrowserRouter} from 'react-router-dom'


const root = createRoot(document.getElementById('root')!)

if(!root) {
	throw new Error()
}

root.render(
	<ThemeProvider>
		<StoreProvider>
			<BrowserRouter >
				<App />
			</BrowserRouter>
		</StoreProvider>
	</ThemeProvider>)