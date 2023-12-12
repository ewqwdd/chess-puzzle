import App from 'app/App'
import './globals.less'
import { createRoot } from 'react-dom/client'


const root = createRoot(document.getElementById('root')!)

if(!root) {
	throw new Error()
}

root.render(<App />)