import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import Input from './Input';
import { TypographyColor } from 'shared/entities/typography';

const SearchIcon = () => 
    <span>🔍</span>;
const ClearIcon = () => 
    <span style={{ cursor: 'pointer' }}>❌</span>;

const meta: Meta<typeof Input> = {
    title: 'UI/Input',
    component: Input,
    tags: ['autodocs'],
    decorators: [
        (StoryComponent, context) => {
            const [value, setValue] = React.useState('');
            return (
                <div style={{ 
                    width: '300px', 
                    height: '100px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    border: '1px solid #eee', 
                    borderRadius: '4px',
                    padding: '10px'
                }}>
                <style>
                    {`
                        *, *::before, *::after {
                            box-sizing: border-box !important;
                        }
                    `}
                </style>
                    <StoryComponent args={{ 
                        ...context.args, 
                        value,
                        onChange: (newValue: string) => {
                            setValue(newValue);
                            context.args.onChange?.(newValue);
                        },
                    }} />
                </div>
            );
        },
    ],
    args: {
        placeholder: 'Введите текст',
        fullWidth: false,
        center: true,
        isValid: true,
        isInvalid: false,
        fontColor: TypographyColor.inherit,
        leftSlot: undefined, 
        rightSlot: undefined,
    },
    argTypes: {
        value: { control: false },
        onChange: { action: 'changed' },
        placeholder: { control: 'text' },
        className: { control: 'text' },
        center: { control: 'boolean' },
        isValid: { control: 'boolean' },
        isInvalid: { control: 'boolean' },
        fontColor: { control: 'select', options: Object.values(TypographyColor) },
        fullWidth: { control: 'boolean' },
        leftSlot: { control: false },
        rightSlot: { control: false },
    },
};

export default meta;

export const Default: StoryObj<typeof Input> = {};

export const WithLeftSlot: StoryObj<typeof Input> = {
    args: {
        leftSlot: <SearchIcon />,
    },
};

export const WithRightSlot: StoryObj<typeof Input> = {
    args: {
        rightSlot: <ClearIcon />,
    },
};