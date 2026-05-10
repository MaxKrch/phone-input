import React from 'react';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';
import Input from 'shared/ui/Input';
import { usePhoneInputStore } from 'store/PhoneInputStore';
import { MASK_DIGIT_ALIAS } from 'shared/entities/countries';
import Typography from 'shared/ui/Typography';

import styles from './PhoneNumber.module.scss';

type Props = {
    className?: string;
}

const PhoneNumber: React.FC<Props> = ({
    className,
}) => {
    const store = usePhoneInputStore();
    const handleChange = (value: string) => {
        store.changePhoneNumber(value);
    }
    const phoneNumber = store.phoneNumber;
    const maskArray = React.useMemo(
        () => store.selectedCountry.mask.split(''), 
        [store.selectedCountry]
    );
  
    return (
        <div className={clsx(styles['phone-number'], className)}>
            {maskArray.map((el, index) => (
                el === MASK_DIGIT_ALIAS ? (
                    <Input 
                        key={index} 
                        value={phoneNumber[index] ?? ''} 
                        onChange={handleChange} 
                        placeholder={MASK_DIGIT_ALIAS}
                        className={clsx(styles['phone-number__element'], styles['phone-number__input'])}
                    />
                ) : (
                    <Typography 
                        Element='span'
                        key={index} 
                        className={clsx(styles['phone-number__element'], styles['phone-number__span'])}
                    >
                        {el}
                    </Typography>
                )
            ))}
        </div>
    )
}

export default observer(PhoneNumber);
