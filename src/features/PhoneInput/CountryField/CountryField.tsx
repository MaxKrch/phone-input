import React from 'react';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';
import styles from './CountryField.module.scss';
import Input from 'shared/ui/Input';
import { usePhoneInputStore } from 'store/PhoneInputStore';
import { Text } from 'shared/entities/text';
import { ChevronIcon } from 'shared/icons';
import { IconColor } from 'shared/entities/icons';
import Loader from 'shared/ui/Loader';

const CountrySelector = React.lazy(
    () => import(/* webpackChunkName: "country-selector" */ './CountrySelector')
);

type Props = {
    className?: string;
    showValidationStatus: boolean;
}

const CountryField: React.FC<Props> = ({
    className,
    showValidationStatus,
}) => {
    const store = usePhoneInputStore();
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [showCountrySelector, setShowCountrySelector] = React.useState(false);
    const handleClick = React.useCallback(() => {
        setShowCountrySelector(prev => !prev);
    }, []);

    const handleChange = React.useCallback((value: string) => {
        if (!store.isValidCountryKey(value)) {
            return;
        }
        store.changeKeySelectedCountry(value);
    }, [store]);

    const handleClose = React.useCallback(() => {
        setShowCountrySelector(false);
    }, []);

    const handleClickOutside = React.useCallback((event: MouseEvent) => {
        if (containerRef.current?.contains(event.target as Node)) {
            return;
        }
        setShowCountrySelector(false);
    }, []);

    React.useEffect(() => {
        if (!showCountrySelector) {
            return;
        }

        document.addEventListener('pointerdown', handleClickOutside);

        return () => {
            document.removeEventListener('pointerdown', handleClickOutside);
        };
    }, [showCountrySelector, handleClickOutside]);

    const isValid = showValidationStatus && store.isValid;
    const isInvalid = showValidationStatus && !store.isValid;
    
    const leftSlot = React.useMemo(() => {
        return (
            <span className={clsx(
                "fi",
                `fi-${store.keySelectedCountry}`,
                styles['country-field__flag-icon']
            )}
            ></span>
        )
    }, [store.keySelectedCountry]);

    return (
        <div 
            className={clsx(styles['country-field'], className)} 
            ref={containerRef}
        >
            <div
                className={styles['country-field__trigger']}
                onClick={handleClick}
            >
                <Input
                    value={store.selectedCountry.prefix}
                    leftSlot={leftSlot}
                    onChange={handleChange}
                    placeholder={Text.countryField.placeholder()}
                    readOnly
                    isValid={isValid}
                    isInvalid={isInvalid}
                    rightSlot={<ChevronIcon color={IconColor.gray} />}
                />
            </div>
            {showCountrySelector &&
                <React.Suspense fallback={<Loader />}>
                    <CountrySelector
                        onClose={handleClose}
                        className={styles['country-field__country-selector']}
                    />
                </React.Suspense>
            }
        </div>
    )
}

export default observer(CountryField);
