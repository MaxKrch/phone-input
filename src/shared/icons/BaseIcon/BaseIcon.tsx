import clsx from 'clsx';
import { IconSize, IconColor } from "shared/entities/icons";

import styles from './BaseIcon.module.scss';

export type IconProps = React.SVGProps<SVGSVGElement> & {
    size?: number;
    color?: IconColor;
    className?: string;
};

const BaseIcon: React.FC<IconProps> = ({ 
    children,
    color = IconColor.gray, 
    size = IconSize.md, 
    className,
    ...rest 
}) => {
    return (
        <svg 
            {...rest}
            width={size}
            height={size}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={clsx(
                styles['icon'], 
                styles[`icon_${color}`],
                className,
            )}
        >
            {children}
        </svg>
    );
};

export default BaseIcon;