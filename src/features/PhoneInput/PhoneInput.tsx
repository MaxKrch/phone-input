import React from 'react';

import PhoneNumber from './PhoneNumber';
import CountryField from './CountryField';
import ValidationMessage from './ValidationMessage';
import styles from './PhoneInput.module.scss';
import { usePhoneInputStore } from 'store/PhoneInputStore/usePhoneInputStore';

const PhoneInput: React.FC = () => {
    const [showValidationStatus, setShowValidationMessageStatus] = React.useState(false);
    const store = usePhoneInputStore();

    const handleValidationRequest = React.useCallback(() => {
        store.validate();
        setShowValidationMessageStatus(true);
    }, [store]);
    
    const handleValidationReset = React.useCallback(() => {
        setShowValidationMessageStatus(false);
    }, []);

    return (
        <div className={styles['phone-input']}>
            <CountryField 
                className={styles['phone-input__country-field']}
                showValidationStatus={showValidationStatus} 
            />
            <PhoneNumber 
                className={styles['phone-input__phone-number']} 
                onValidationRequest={handleValidationRequest} 
                onValidationReset={handleValidationReset}
                showValidationStatus={showValidationStatus}
            />
            <ValidationMessage 
                className={styles['phone-input__validation-message']}
                showValidationStatus={showValidationStatus} 
            />
        </div>
    )
}

export default PhoneInput;