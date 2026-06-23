import { Meta, StoryObj } from '@storybook/react';

import Typography from './Typography';
import { TypographyColor, TypographySize, TypographyWeight } from 'shared/entities/typography';

const meta: Meta<typeof Typography> = {
    title: 'UI/Typography',
    component: Typography,
    tags: ['autodocs'],
    args: {
        children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        size: TypographySize.m,
        weight: TypographyWeight.regular,
        color: TypographyColor.primary,
        Element: 'div'
    },
    argTypes: {
        size: { control: 'select', options: Object.values(TypographySize) },
        weight: { control: 'select', options: Object.values(TypographyWeight) },
        color: { control: 'select', options: Object.values(TypographyColor) },
        Element: { control: 'select', options: ['span', 'div'] },
        className: { control: 'text' }
    }
};

export default meta;
export const Default: StoryObj<typeof Typography> = {};