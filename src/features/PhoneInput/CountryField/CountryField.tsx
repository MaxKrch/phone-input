import React from 'react';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';
import styles from './CountryField.module.scss';
import Input from 'shared/ui/Input';
import { usePhoneInputStore } from 'store/PhoneInputStore';
import { CountryKey } from 'shared/entities/countries';

type Props = {
    onClick?: () => void;
    onChange?: (value: CountryKey) => void;
    className?: string;
}

const CountryField: React.FC<Props> = ({
    onClick,
    onChange,
    className,
}) => {
    const store = usePhoneInputStore();
    const value = store.keySelectedCountry;
    const placeholder = 'Select country';

    const handleChange = (value: string) => {
        if (!store.isValidCountryKey(value)) {
            return;
        }
        store.changeKeySelectedCountry(value);
        onChange?.(value);
    }
    const icon = store.selectedCountry?.emoji;
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
                placeholder={placeholder}
                readOnly={!onChange}
                className={styles['country-field-input']}
            />
        </div>
    )
}

export default observer(CountryField);
