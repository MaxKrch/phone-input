import React from 'react';
import { PhoneInputProvider } from 'store/PhoneInputStore';

import PhoneNumber from './PhoneNumber';
import styles from './PhoneInput.module.scss';
import CountryField from './CountryField';

const CountrySelector = React.lazy(
    () => import(/* webpackChunkName: "country-selector" */ './CountrySelector')
);

const PhoneInput: React.FC = () => {
    const [showCountrySelector, setShowCountrySelector] = React.useState(false);
    return (
        <PhoneInputProvider>
            <div className={styles['phone-input']}>
                <CountryField />
                <PhoneNumber />
                {showCountrySelector && (
                    <CountrySelector />
                )}
            </div>
        </PhoneInputProvider>
    )
}

export default PhoneInput;