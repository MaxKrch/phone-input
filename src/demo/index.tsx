import { createRoot } from 'react-dom/client'
import App from 'demo/App'
import './styles/global.scss'

const root = createRoot(document.getElementById('app')!);
root.render(<App />)