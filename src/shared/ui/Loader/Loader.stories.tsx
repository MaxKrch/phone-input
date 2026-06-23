import type { Meta, StoryObj } from '@storybook/react';

import Loader from './Loader';
import { IconColor, IconSize } from 'shared/entities/icons';

const meta: Meta<typeof Loader> = {
    title: 'UI/Loader',
    component: Loader,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ 
                width: '100px', 
                height: '100px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                border: '1px solid #eee',
                borderRadius: '4px'
            }}>
                <Story />
            </div>
        ),
    ],
    args: {
        size: IconSize.md,
        color: IconColor.brand,
    },
    argTypes: {
        size: {
            control:   { 
                type: 'select',
                labels: {
                    [IconSize.sm]: 'sm',
                    [IconSize.md]: 'md'
                }
            },
            options: Object.values(IconSize).filter(value => typeof value === 'number')
        },
        color: {
            control: 'select',
            options: Object.values(IconColor),
        },
        className: { control: 'text' }
    }
};

export default meta;
export const Default: StoryObj<typeof Loader> = {};