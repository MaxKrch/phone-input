import React from 'react';
import clsx from 'clsx';
import styles from './Typography.module.scss';
import { TypographyColor, TypographySize, TypographyWeight } from 'shared/entities/typography';

type Props = React.PropsWithChildren<{
    Element?: 'div' | 'span';
    size?: TypographySize;
    weight?: TypographyWeight;
    color?: TypographyColor;
    className?: string;
}>

const Typography: React.FC<Props> = ({
    children,
    Element = 'div',
    size = TypographySize.m,
    weight = TypographyWeight.regular,
    color = TypographyColor.inherit,
    className,
}) => {
    return (
        <Element 
            className={clsx(
                styles['typography'], 
                styles[`typography_${size}`], 
                styles[`typography_${weight}`], 
                styles[`typography_${color}`], 
                className
            )}
        >
            {children}
        </Element>
    )
}

export default React.memo(Typography);