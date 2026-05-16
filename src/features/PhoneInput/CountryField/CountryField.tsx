import React from 'react';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';
import styles from './CountryField.module.scss';
import Input from 'shared/ui/Input';
import { usePhoneInputStore } from 'store/PhoneInputStore';
import { CountryKey } from 'shared/entities/countries';
import { Text } from 'shared/entities/text';

const CountrySelector = React.lazy(
    () => import(/* webpackChunkName: "country-selector" */ './CountrySelector')
);

type Props = {
    onClick?: () => void;
    onChange?: (value: CountryKey) => void;
    className?: string;
    showValidationStatus: boolean;
}

const CountryField: React.FC<Props> = ({
    onClick,
    onChange,
    className,
    showValidationStatus,
}) => {
    const store = usePhoneInputStore();
    const value = store.keySelectedCountry;
    const [showCountrySelector, setShowCountrySelector] = React.useState(false);
    
    const handleChange = (value: string) => {
        if (!store.isValidCountryKey(value)) {
            return;
        }
        store.changeKeySelectedCountry(value);
        onChange?.(value);
    }
    const icon = store.selectedCountry?.emoji;
    const isValid = showValidationStatus && store.isValid;
    const isInvalid = showValidationStatus && !store.isValid;
    
    return (
        <div 
            className={clsx(
                styles['country-field'], 
                !value && styles['country-field_placeholder'],
                className
            )}
            onClick={onClick}
        >
            <span className={styles['country-field-icon']}>
                {icon}
            </span>
            <Input
                value={value}
                onChange={handleChange}
                placeholder={Text.countryField.placeholder()}
                readOnly={!onChange}
                className={styles['country-field-input']}
                isValid={isValid}
                isInvalid={isInvalid}
            />
            {showCountrySelector && <CountrySelector />}
        </div>
    )
}

export default observer(CountryField);
