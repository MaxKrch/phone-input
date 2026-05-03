import { createRoot } from 'react-dom/client'
import App from '@demo/App'

const root = createRoot(document.getElementById('app')!);
root.render(<App />)