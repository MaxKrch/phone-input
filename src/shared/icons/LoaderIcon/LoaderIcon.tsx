import React from 'react';
import { IconColor, IconSize } from 'shared/entities/icons';

import BaseIcon from '../BaseIcon/BaseIcon';
import { IconProps } from '../BaseIcon/BaseIcon';

const LoaderIcon: React.FC<IconProps> = ({
    size = IconSize.sm,
    color = IconColor.brand,
    ...rest
}) => {
    const gradientId = React.useId();

    return (
        <BaseIcon
            size={size}
            color={color}
            viewBox="0 0 16 16"
            {...rest}
        >
            <defs>
                <linearGradient
                    id={gradientId}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                >
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
                </linearGradient>
            </defs>
            <circle
                cx="8"
                cy="8"
                r="6"
                fill="none"
                stroke={`url(#${gradientId})`}
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="28 10"
                transform="rotate(-90 8 8)"
            />
        </BaseIcon>
    );
};

export default LoaderIcon;
