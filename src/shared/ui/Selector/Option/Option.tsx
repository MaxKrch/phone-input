import React from 'react';
import clsx from 'clsx';
import { SelectorOption } from 'shared/entities/selector';
import styles from './Option.module.scss';
import Typography from 'shared/ui/Typography/Typography';
import { TypographySize, TypographyWeight, TypographyColor } from 'shared/entities/typography';

type Props = {
    option: SelectorOption;
    isSelected: boolean;
    onSelect: () => void;
    className?: string;
}

const Option: React.FC<Props> = ({ 
    option, 
    isSelected, 
    onSelect,
    className,
}) => {
    return (
        <div 
            className={clsx(
                styles['option'], 
                isSelected && styles['option_selected'],
                className,
            )} 
            onClick={onSelect}
        >
            {option.icon}
            <Typography size={TypographySize.m} weight={TypographyWeight.regular} color={TypographyColor.primary}>
                {option.value}
            </Typography>
        </div>
    )
}

export default React.memo(Option);
      