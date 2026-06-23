import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Option from './Option';
import BaseIcon from 'shared/icons/BaseIcon/BaseIcon';
import { IconColor, IconSize } from 'shared/entities/icons';

// 1. Простая иконка чекбокса (галочки) через стандартный SVG
const CheckIcon = () => (
    <BaseIcon size={IconSize.md} color={IconColor.brand}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    </BaseIcon>
);

const meta: Meta<typeof Option> = {
    title: 'UI/Selector/Option',
    component: Option,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{
                width: '250px',
                border: '1px solid #eee',
                borderRadius: '4px',

            }}>
                <Story />
            </div>
        ),
    ],
    args: {
        isSelected: false,
    },
    argTypes: {
        option: { control: 'object' },
        isSelected: { control: 'boolean' },
        onSelect: { action: 'selected' },
        className: { control: 'text' },
    },
};

export default meta;
type Story = StoryObj<typeof Option>;

export const WithIcon: Story = {
    args: {
        option: {
            key: 'ru',
            value: 'Россия',
            icon: <CheckIcon />,
        },
    },
};

export const WithoutIcon: Story = {
    args: {
        option: {
            key: 'us',
            value: 'United States',
        },
    },
};