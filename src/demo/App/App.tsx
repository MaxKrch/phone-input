import PhoneInput from "features/PhoneInput"

import styles from './App.module.scss';
import { PhoneInputProvider } from "store/PhoneInputStore";

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