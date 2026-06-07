import PhoneInput from "features/PhoneInput"
import { PhoneInputProvider } from "store/PhoneInputStore";

import styles from './App.module.scss';

const App: React.FC = () => {
    return (
        <div className={styles['app']}>
            <h1>Phone Input</h1>
            <PhoneInputProvider>
                <PhoneInput />
            </PhoneInputProvider>
        </div>
    )
}

export default App