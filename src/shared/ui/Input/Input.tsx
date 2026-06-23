import React from 'react';
import clsx from 'clsx';
import styles from './Input.module.scss';
import { TypographyColor } from 'shared/entities/typography';

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
    value: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    center?: boolean;
    isValid?: boolean;
    isInvalid?: boolean;
    fontColor?: TypographyColor
    leftSlot?: React.ReactNode;
    rightSlot?: React.ReactNode;
    fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, Props>(({
    value,
    onChange,
    placeholder,
    className,
    center,
    isValid,
    isInvalid,
    leftSlot,
    fontColor = TypographyColor.inherit,
    rightSlot,
    fullWidth = false,
    ...props
}, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(event.target.value);
    }
    
    return (
        <div className={clsx(
            styles['input-container'], 
            fullWidth && styles['input-container_full-width']
        )}>
            {leftSlot && <div className={styles['input__left-slot']}>{leftSlot}</div>}
            <input
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className={clsx(
                    styles['input'],
                    center && styles['input_center'],
                    isValid && styles['input_valid'],
                    isInvalid && styles['input_invalid'],
                    leftSlot && styles['input_with-left-slot'],
                    rightSlot && styles['input_with-right-slot'],
                    styles[`input_${fontColor}`],
                    className
                )}
                ref={ref}
                {...props}
            />
            {rightSlot && <div className={styles['input__right-slot']}>{rightSlot}</div>}
        </div>
    )
});

Input.displayName = 'Input';
export default React.memo(Input);