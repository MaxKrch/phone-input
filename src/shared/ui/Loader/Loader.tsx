import React from 'react';
import { IconColor, IconSize } from 'shared/entities/icons';
import LoaderIcon from 'shared/icons/LoaderIcon/LoaderIcon';

import styles from './Loader.module.scss';
import clsx from 'clsx';

type Props = {
    color?: IconColor;
    size?: IconSize;
    className?: string;
}

const Loader: React.FC<Props> = ({
    color = IconColor.brand,
    size = IconSize.sm,
    className,
}) => {
    return (
        <div className={clsx(styles['loader'], className)}>
            <LoaderIcon className={styles['loader__icon']} color={color} size={size} />
        </div>
    )
}

export default React.memo(Loader);