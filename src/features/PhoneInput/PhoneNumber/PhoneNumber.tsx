import React from 'react';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';
import Input from 'shared/ui/Input';
import { usePhoneInputStore } from 'store/PhoneInputStore';
import { MASK_DIGIT_ALIAS } from 'shared/entities/countries';
import Typography from 'shared/ui/Typography';

import useKeyDownInput from './useKeyDownInput';
import styles from './PhoneNumber.module.scss';

type Props = {
    className?: string;
    onValidationRequest?: () => void;
    onValidationReset?: () => void;
    showValidationStatus: boolean;
}

const PhoneNumber: React.FC<Props> = ({
    className,
    onValidationRequest,
    onValidationReset,
    showValidationStatus,
}) => {
    const store = usePhoneInputStore();

    const { handleKeyDown } = useKeyDownInput({
        store,
        onPressEnter: onValidationRequest,
        onChange: onValidationReset,
    });

    const digitSlotCount = store.digitSlotCount;

    const inputRefMap = React.useMemo(() => {
        const map = new Map<number, React.RefObject<HTMLInputElement | null>>();
        for (let i = 0; i < digitSlotCount; i++) {
            map.set(i, React.createRef<HTMLInputElement | null>());
        }
        return map;
    }, [digitSlotCount]);

    const focusSlotIndex = store.phoneInputIndex;
    const phoneDigitsKey = store.phoneNumberDigits.join('');

    React.useLayoutEffect(() => {
        const focusedByStore = focusSlotIndex !== null
            ? inputRefMap.get(focusSlotIndex)?.current
            : null;

        if (focusedByStore) {
            focusedByStore.focus();
            focusedByStore.setSelectionRange(0, 0);
            return;
        }

        for (const ref of inputRefMap.values()) {
            const input = ref.current;
            if (input && document.activeElement === input) {
                input.setSelectionRange(0, 0);
                return;
            }
        }
    }, [focusSlotIndex, phoneDigitsKey, inputRefMap]);

    const isValid = showValidationStatus && store.isValid;
    const isInvalid = showValidationStatus && !store.isValid;

    return (
        <div className={clsx(styles['phone-number'], className)}>
            {store.maskArray.map((el, maskIndex) => {
               
                if (el === MASK_DIGIT_ALIAS) {
                    const digit = store.getDigitByMaskIndex(maskIndex); 
                    const inputIndex = store.getInputIndexByMaskIndex(maskIndex);
                    if (inputIndex === null) {
                        return null;
                    }
                    return (
                        <Input
                            key={`digit-${maskIndex}`}
                            value={digit ?? ''}
                            maxLength={1}
                            className={styles['phone-number__input']}
                            center
                            onKeyDown={handleKeyDown(inputIndex)}
                            ref={inputRefMap.get(inputIndex)}
                            isValid={isValid}
                            isInvalid={isInvalid}
                        />
                    );
                }

                return (
                    <Typography
                        Element="span"
                        key={`mask-${maskIndex}`}
                    >
                        {el}
                    </Typography>
                );
            })}
        </div>
    );
};

export default observer(PhoneNumber);
