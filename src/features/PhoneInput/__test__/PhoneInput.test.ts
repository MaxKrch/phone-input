import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('shared/entities/countries', () => {
    const mockCountriesArray = [
        {
            key: 'ru',
            name: 'Russia',
            emoji: 'ru',
            prefix: '+7',
            mask: '(***) ***-**-**',
            digits: 10,
        },
        {
            key: 'fr',
            name: 'France',
            emoji: 'fr',
            prefix: '+33',
            mask: '* ** ** ** **',
            digits: 9,
        },
    ] as const;

    return {
        countries: mockCountriesArray,
        DEFAULT_COUNTRY_KEY: 'ru',
        DEFAULT_COUNTRY: mockCountriesArray[0],
        MASK_DIGIT_ALIAS: '*',
    };
});

import PhoneInput from '../PhoneInput';
import { PhoneInputProvider } from 'store/PhoneInputStore/PhoneInputProvider';
import { Text } from 'shared/entities/text';

const renderPhoneInput = () => {
    render(
        React.createElement(
            PhoneInputProvider,
            null,
            React.createElement(PhoneInput),
        ),
    );
};

const getPhoneInputs = (): HTMLInputElement[] =>
    screen
        .getAllByRole('textbox')
        .filter((element): element is HTMLInputElement => !element.hasAttribute('readonly'));

const fillPhoneNumber = (digits: string) => {
    const inputs = getPhoneInputs();

    digits.split('').forEach((digit, index) => {
        fireEvent.keyDown(inputs[index], { key: digit });
    });
};

describe('PhoneInput', () => {
    beforeEach(() => {
        renderPhoneInput();
    });

    describe('initial render', () => {
        it('renders country field with the default country prefix', () => {
            expect(screen.getByDisplayValue('+7')).toBeInTheDocument();
        });

        it('renders phone inputs according to the default country mask', () => {
            expect(getPhoneInputs()).toHaveLength(10);
        });

        it('does not render validation message before validation is requested', () => {
            expect(screen.queryByText(Text.validatePhone.error())).not.toBeInTheDocument();
            expect(screen.queryByText(Text.validatePhone.success())).not.toBeInTheDocument();
        });
    });

    describe('validation flow', () => {
        it('shows an error message after validation is requested for an incomplete phone number', () => {
            const [firstInput] = getPhoneInputs();

            fireEvent.keyDown(firstInput, { key: '9' });
            fireEvent.keyDown(firstInput, { key: 'Enter' });

            expect(screen.getByText(Text.validatePhone.error())).toBeInTheDocument();
            expect(screen.queryByText(Text.validatePhone.success())).not.toBeInTheDocument();
        });

        it('shows a success message after validation is requested for a complete valid phone number', () => {
            fillPhoneNumber('9123456789');

            const inputs = getPhoneInputs();
            fireEvent.keyDown(inputs[inputs.length - 1], { key: 'Enter' });

            expect(screen.getByText(Text.validatePhone.success())).toBeInTheDocument();
            expect(screen.queryByText(Text.validatePhone.error())).not.toBeInTheDocument();
        });
    });

    describe('validation reset', () => {
        it('hides validation message after the phone number changes', () => {
            const inputs = getPhoneInputs();

            fireEvent.keyDown(inputs[0], { key: '1' });
            fireEvent.keyDown(inputs[0], { key: 'Enter' });
            expect(screen.getByText(Text.validatePhone.error())).toBeInTheDocument();

            fireEvent.keyDown(inputs[1], { key: '2' });

            expect(screen.queryByText(Text.validatePhone.error())).not.toBeInTheDocument();
            expect(screen.queryByText(Text.validatePhone.success())).not.toBeInTheDocument();
        });
    });

    describe('country change', () => {
        it('resets entered phone number after country change', async () => {
            const inputs = getPhoneInputs();

            fireEvent.keyDown(inputs[0], { key: '1' });
            fireEvent.keyDown(inputs[0], { key: 'Enter' });
            expect(screen.getByText(Text.validatePhone.error())).toBeInTheDocument();

            fireEvent.click(screen.getByDisplayValue('+7'));
            fireEvent.click(await screen.findByText('France'));

            expect(screen.getByDisplayValue('+33')).toBeInTheDocument();
            expect(getPhoneInputs()).toHaveLength(9);
            expect(getPhoneInputs().every((input) => input.value === '')).toBe(true);
        });
    });
});
