import BaseIcon from "../BaseIcon/BaseIcon";
import { IconColor, IconSize } from "shared/entities/icons";
import { IconProps } from "../BaseIcon/BaseIcon";

const WarningIcon: React.FC<IconProps> = ({ 
    size = IconSize.sm, 
    color = IconColor.red,
    ...rest
}) => {
    return (
        <BaseIcon 
            size={size} 
            color={color} 
            viewBox="0 0 16 16" 
            {...rest}
        >
            <path
                d="M6.175 6.53333L10 10.35L13.825 6.53333L15 7.70833L10 12.7083L5 7.70833L6.175 6.53333Z"
                fill="currentColor"
            />
        </BaseIcon>
    )
}

export default WarningIcon;