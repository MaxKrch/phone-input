import WarningIcon from './WarningIcon';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { IconColor, IconSize } from 'shared/entities/icons';

const meta: Meta<typeof WarningIcon> = {
    title: 'Icons/WarningIcon',
    component: WarningIcon,
    tags: ['autodocs'],
    argTypes: {
        size: {
            control:   { type: 'select',
                labels: {
                    [IconSize.sm]: 'sm',
                    [IconSize.md]: 'md'
                }
            },
            options: Object.values(IconSize).filter(value => typeof value === 'number'),
        },
        color: {
            control: 'select',
            options: Object.values(IconColor),
        },
    },
};

export default meta;
export const Default: StoryObj<typeof WarningIcon> = {};