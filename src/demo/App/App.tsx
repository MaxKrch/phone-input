import PhoneInput from "features/PhoneInput"

import styles from './App.module.scss';

const App: React.FC = () => {
    return (
        <div className={styles['app']}>
            <h1>Phone Input</h1>
            <PhoneInput />
        </div>
    )
}

export default App