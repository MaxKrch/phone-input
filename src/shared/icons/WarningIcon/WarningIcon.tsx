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
                d="M0.666656 14H15.3333L7.99999 1.33331L0.666656 14ZM8.66666 12H7.33332V10.6666H8.66666V12ZM8.66666 9.33331H7.33332V6.66665H8.66666V9.33331Z" 
                fill="currentColor"
            />
        </BaseIcon>
    )
}

export default WarningIcon;