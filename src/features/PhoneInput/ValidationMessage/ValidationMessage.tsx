import React from 'react';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';

import styles from './ValidationMessage.module.scss';
import Typography from 'shared/ui/Typography';
import { Text } from 'shared/entities/text';
import { usePhoneInputStore } from 'store/PhoneInputStore';
import { SuccessIcon, WarningIcon } from 'shared/icons';
import { TypographyColor, TypographySize } from 'shared/entities/typography';

type Props = {
    showValidationStatus: boolean;
    className?: string;
}

const ValidationMessage: React.FC<Props> = ({
    className,
    showValidationStatus,
}) => {
    const store = usePhoneInputStore();

    if (!showValidationStatus) {
        return null;
    }

    const message = store.isValid 
        ? Text.validatePhone.success() 
        : Text.validatePhone.error();

    const Icon = store.isValid ? SuccessIcon : WarningIcon;

    return (
        <div className={clsx(styles['validation-message'], className)}>
            <Icon />
            <Typography
                size={TypographySize.s}
                color={TypographyColor.secondary}
            >
                {message}
            </Typography>
        </div>
    )
}

export default observer(ValidationMessage);