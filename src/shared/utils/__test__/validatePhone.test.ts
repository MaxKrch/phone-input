import { validatePhone } from '../validatePhone';
import { Text } from 'shared/entities/text';
import { Country } from 'shared/entities/countries';

const mockCountry: Country = {
    key: 'ru',
    name: 'Россия',
    emoji: '🇷🇺',
    prefix: '+7',
    mask: '(***) ***-**-**',
    digits: 10,
} as const;

describe('validatePhone', () => {
    it('returns null for a valid phone number', () => {
        expect(validatePhone('9123456789', mockCountry)).toBeNull();
    });

    it('returns an error for a phone number with invalid length', () => {
        expect(validatePhone('12345', mockCountry)).toBe(Text.validatePhone.error());
    });

    it('returns an error for a phone number with non-digits characters', () => {
        expect(validatePhone('abcdefghij', mockCountry)).toBe(Text.validatePhone.error());
    });

    it('returns an error for a phone number with non-digits and digits characters', () => {
        expect(validatePhone('12345abcde', mockCountry)).toBe(Text.validatePhone.error());
    });
});
