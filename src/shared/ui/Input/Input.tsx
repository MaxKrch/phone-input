import React from 'react';
import clsx from 'clsx';
import styles from './Input.module.scss';

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
    value: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
}

const Input: React.FC<Props> = ({
    value,
    onChange,
    placeholder,
    className,
    ...props
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(event.target.value);
    }
    
    return (
        <div className={clsx(styles['input-container'], className)}>
            <input
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className={styles['input']}
                {...props}
            />
        </div>
    )
}

export default React.memo(Input);