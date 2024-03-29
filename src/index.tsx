import App from 'app/App'
import StoreProvider from 'app/store/ui/StoreProvider'
import 'app/styles/globals.less'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'shared/context/theme'
import {BrowserRouter} from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { NotificationsProvider } from 'entities/Notification'
import { TouchBackend } from 'react-dnd-touch-backend'
import { isMobile } from 'react-device-detect'


const root = createRoot(document.getElementById('root')!)

if(!root) {
	throw new Error()
}

root.render(
	<DndProvider backend={isMobile ? TouchBackend  : HTML5Backend}>
		<ThemeProvider>
			<NotificationsProvider>
				<StoreProvider>
					<BrowserRouter >
						<App />
					</BrowserRouter>
				</StoreProvider>
			</NotificationsProvider>
		</ThemeProvider>
	</DndProvider>)