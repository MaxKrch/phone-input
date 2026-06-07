import React from 'react';
import clsx from 'clsx';
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

const CountrySelector = React.forwardRef<HTMLDivElement, Props>(({
    onClose,
    className,
}, ref) => {
    const store = usePhoneInputStore();
    const options = getSelectorOptions(Array.from(store.countries.values()));
    const selectedKey = store.keySelectedCountry;
    const onChange = (key: string) => {
        store.changeKeySelectedCountry(key as CountryKey);
        onClose?.();
    }
    return (
        <div className={clsx(styles['country-selector'], className)} ref={ref}>
            <Selector
                options={options}
                selectedKey={selectedKey}
                onChange={onChange}
            />     
        </div>
    )
});

CountrySelector.displayName = 'CountrySelector';
export default observer(CountrySelector);