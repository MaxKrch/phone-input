import React from 'react';
import clsx from 'clsx';
import styles from './Input.module.scss';

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
    value: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    center?: boolean;
    isValid?: boolean;
    isInvalid?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, Props>(({
    value,
    onChange,
    placeholder,
    className,
    center,
    isValid,
    isInvalid,
    ...props
}, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(event.target.value);
    }
    
    return (
        <div className={clsx(styles['input-container'], className)}>
            <input
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className={clsx(
                    styles['input'],
                    center && styles['input_center'],
                    isValid && styles['input_valid'],
                    isInvalid && styles['input_invalid'],
                )}
                ref={ref}
                {...props}
            />
        </div>
    )
});

Input.displayName = 'Input';
export default React.memo(Input);