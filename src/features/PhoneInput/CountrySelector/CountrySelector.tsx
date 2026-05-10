import React from 'react';
import { observer } from 'mobx-react-lite';
import { usePhoneInputStore } from 'store/PhoneInputStore';
import { CountryKey } from 'shared/entities/countries';
import Selector from 'shared/ui/Selector';

import { getSelectorOptions } from './getSelectorOptions';

import styles from './CountrySelector.module.scss';

type Props = {
    onClose?: () => void;
    className?: string;
}

const CountrySelector: React.FC<Props> = ({
    onClose,
    className,
}) => {
    const store = usePhoneInputStore();
    const options = getSelectorOptions(Array.from(store.countries.values()));
    const selectedKey = store.keySelectedCountry;
    const onChange = (key: string) => {
        store.changeKeySelectedCountry(key as CountryKey);
        onClose?.();
    }
    return (
        <div className={className}>
            <Selector
                options={options}
                selectedKey={selectedKey}
                onChange={onChange}
                className={styles['country-selector']}
            />       
        </div>

    )
}

export default observer(CountrySelector);