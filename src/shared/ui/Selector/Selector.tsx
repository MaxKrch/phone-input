import React from 'react';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';
import Option from './Option/Option';
import { SelectorOption } from 'shared/entities/selector';

import styles from './Selector.module.scss';

type Props = {
    options: SelectorOption[];
    selectedKey: string;
    onChange: (key: string) => void;
    className?: string;
}

const Selector: React.FC<Props> = ({
    options,
    selectedKey,
    onChange,
    className,
}) => {
    return (
        <ul className={clsx(styles['selector'], className)}>
            {options.map((option) => (
                <li key={option.key}>
                    <Option 
                        option={option} 
                        isSelected={selectedKey === option.key} 
                        onSelect={() => onChange(option.key)} 
                    />
                </li>
            ))}
        </ul>
    )
}

export default observer(Selector);