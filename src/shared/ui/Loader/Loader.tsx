import React from 'react';
import { IconColor } from 'shared/entities/icons';
import LoaderIcon from 'shared/icons/LoaderIcon/LoaderIcon';

import styles from './Loader.module.scss';
import clsx from 'clsx';

type Props = {
    color?: IconColor;
    className?: string;
}

const Loader: React.FC<Props> = ({
    color = IconColor.brand,
    className,
}) => {
    return (
        <div className={clsx(styles['loader'], className)}>
            <LoaderIcon color={IconColor.brand} />
        </div>
    )
}

export default Loader;