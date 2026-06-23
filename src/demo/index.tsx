import { createRoot } from 'react-dom/client';
import App from 'demo/App';
import './styles/global.scss';
import './assets/favicon.png';

const root = createRoot(document.getElementById('app')!);
root.render(<App />)