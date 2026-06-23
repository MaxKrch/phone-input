import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Selector from './Selector';
import { SelectorOption } from 'shared/entities/selector';


const options: SelectorOption[] = [
    { key: '1', value: 'Option 1', },
    { key: '2', value: 'Option 2' },
    { key: '3', value: 'Option 3' },
];

const meta: Meta<typeof Selector> = {
    title: 'UI/Selector',
    component: Selector,
    tags: ['autodocs'],
    args: {
        options,
        selectedKey: options[0].key,
        onChange: () => {},
    },
    argTypes: {
        options: { control: 'object' },
        selectedKey: { control: 'text' },
        onChange: { action: 'changed' },
        className: { control: 'text' },
    },
};

export default meta;
export const Default: StoryObj<typeof Selector> = {
    // Используем встроенное свойство decorators для создания интерактивного стенда
    decorators: [
        (StoryComponent, context) => {
            const [selectedKey, setSelectedKey] = React.useState(options[0].key);

            return (
                <div style={{ 
                    width: '250px', 
                    border: '1px solid #eee', 
                    borderRadius: '4px'
                }}>
                    <style>
                        {`
                        ul, li {
                            list-style: none !important;
                            list-style-type: none !important;
                            padding: 0 !important;
                            margin: 0 !important;
                        }
                        `}
                    </style>
                    <StoryComponent args={{ 
                        ...context.args, 
                        selectedKey, 
                        onChange: (key: string) => {
                            setSelectedKey(key);
                            context.args.onChange?.(key);
                        }
                    }} />
                </div>
            );
        },
    ],
};