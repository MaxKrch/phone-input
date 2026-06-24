import PhoneInputStore from '../PhoneInputStore';
import { RemoveTarget } from 'shared/entities/common';
import { CountryKey } from 'shared/entities/countries';
import { maskSegmentKind } from 'shared/entities/phoneNumber';
import { Text } from 'shared/entities/text';

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
            key: 'kz',
            name: 'Kazakhstan',
            emoji: 'kz',
            prefix: '+7',
            mask: '(***) ***-**-**',
            digits: 10,
        },
        {
            key: 'us',
            name: 'USA',
            emoji: 'us',
            prefix: '+1',
            mask: '(***) ***-****',
            digits: 10,
        },
    ] as const;

    return {
        countries: mockCountriesArray,
        DEFAULT_COUNTRY_KEY: 'ru',
        DEFAULT_COUNTRY: mockCountriesArray[0],
        MASK_DIGIT_ALIAS: '*',
    };
});

import {
    countries,
    DEFAULT_COUNTRY,
    DEFAULT_COUNTRY_KEY,
    MASK_DIGIT_ALIAS,
} from 'shared/entities/countries';

const expectedCountriesMap = new Map(countries.map((country) => [country.key, country]));

const getMaskDigitIndexes = (mask: string): number[] =>
    mask
        .split('')
        .map((char, index) => (char === MASK_DIGIT_ALIAS ? index : -1))
        .filter((index) => index >= 0);

describe('PhoneInputStore', () => {
    let store: PhoneInputStore;

    beforeEach(() => {
        store = new PhoneInputStore();
    });

    describe('initialization', () => {
        it('sets default state from the default country', () => {
            expect(store.countries).toEqual(expectedCountriesMap);
            expect(store.keySelectedCountry).toBe(DEFAULT_COUNTRY_KEY);
            expect(store.selectedCountry).toEqual(DEFAULT_COUNTRY);
            expect(store.error).toBeNull();
            expect(store.isValid).toBe(true);
            expect(store.phoneInputIndex).toBeNull();
            expect(store.digitSlotCount).toBe(DEFAULT_COUNTRY.digits);
            expect(store.maskArray).toEqual(DEFAULT_COUNTRY.mask.split(''));
            expect(store.phoneNumberDigits).toEqual(new Array(DEFAULT_COUNTRY.digits).fill(''));
        });

        it('builds phone segments from the country mask', () => {
            const segments = store._phoneNumberSegments;
            const digitSegments = segments.filter((segment) => segment.kind === maskSegmentKind.digit);

            expect(segments).toHaveLength(DEFAULT_COUNTRY.mask.length);
            expect(digitSegments).toHaveLength(DEFAULT_COUNTRY.digits);

            digitSegments.forEach((segment, inputIndex) => {
                expect(segment.inputIndex).toBe(inputIndex);
                expect(segment.value).toBe('');
            });
        });
    });

    describe('country selection', () => {
        it('changes country and resets entered state', () => {
            const expectedCountry = countries[0]; 

            store.addDigitToPhoneNumber('1', 0);
            store.addDigitToPhoneNumber('2', 1);
            store.setPhoneInputIndex(2);
            store.validate();

            store.changeKeySelectedCountry(expectedCountry.key);

            expect(store.keySelectedCountry).toBe(expectedCountry.key);
            expect(store.selectedCountry).toEqual(expectedCountry);
            expect(store.phoneNumberDigits).toEqual(new Array(expectedCountry.digits).fill(''));
            expect(store.phoneInputIndex).toBeNull();
            expect(store.error).toBeNull();
            expect(store.maskArray).toEqual(expectedCountry.mask.split(''));
        });

        it('ignores an unknown country key', () => {
            store.changeKeySelectedCountry('invalid' as CountryKey);

            expect(store.keySelectedCountry).toBe(DEFAULT_COUNTRY_KEY);
            expect(store.selectedCountry).toEqual(DEFAULT_COUNTRY);
        });

        it('checks country keys against the countries map', () => {
            expect(store.isValidCountryKey('ru' )).toBe(true);
            expect(store.isValidCountryKey('us')).toBe(true);
            expect(store.isValidCountryKey('invalid')).toBe(false);
        });
    });

    describe('digit input', () => {
        it('writes a digit by input index and moves focus forward', () => {
            store.addDigitToPhoneNumber('1', 0);

            expect(store.getDigitByInputIndex(0)).toBe('1');
            expect(store.phoneInputIndex).toBe(1);
        });

        it('replaces the digit at the given input index', () => {
            store.addDigitToPhoneNumber('1', 0);
            store.addDigitToPhoneNumber('9', 0);

            expect(store.getDigitByInputIndex(0)).toBe('9');
            expect(store.phoneNumberDigits[0]).toBe('9');
        });

        it('ignores non-digit input', () => {
            store.addDigitToPhoneNumber('a', 0);
            store.addDigitToPhoneNumber('-', 0);

            expect(store.phoneNumberDigits).toEqual(new Array(DEFAULT_COUNTRY.digits).fill(''));
            expect(store.phoneInputIndex).toBeNull();
        });

        it('ignores out-of-range input indexes', () => {
            store.addDigitToPhoneNumber('1', -1);
            store.addDigitToPhoneNumber('1', DEFAULT_COUNTRY.digits);

            expect(store.phoneNumberDigits).toEqual(new Array(DEFAULT_COUNTRY.digits).fill(''));
            expect(store.phoneInputIndex).toBeNull();
        });

        it('does not move focus past the last slot', () => {
            store.setPhoneInputIndex(DEFAULT_COUNTRY.digits - 1);

            store.addDigitToPhoneNumber('1', DEFAULT_COUNTRY.digits - 1);

            expect(store.getDigitByInputIndex(DEFAULT_COUNTRY.digits - 1)).toBe('1');
            expect(store.phoneInputIndex).toBe(DEFAULT_COUNTRY.digits - 1);
        });
    });

    describe('digit removal', () => {
        it('removes the previous digit on backspace and shifts the tail left', () => {
            store.addDigitToPhoneNumber('1', 0);
            store.addDigitToPhoneNumber('2', 1);
            store.addDigitToPhoneNumber('3', 2);
            store.setPhoneInputIndex(2);

            store.removeDigitFromPhoneNumber(2, RemoveTarget.prev);

            expect(store.phoneNumberDigits.slice(0, 4)).toEqual(['1', '3', '', '']);
            expect(store.phoneInputIndex).toBe(1);
        });

        it('removes the current digit on delete and keeps focus in place', () => {
            store.addDigitToPhoneNumber('1', 0);
            store.addDigitToPhoneNumber('2', 1);
            store.addDigitToPhoneNumber('3', 2);
            store.setPhoneInputIndex(1);

            store.removeDigitFromPhoneNumber(1, RemoveTarget.this);

            expect(store.phoneNumberDigits.slice(0, 4)).toEqual(['1', '3', '', '']);
            expect(store.phoneInputIndex).toBe(1);
        });

        it('ignores backspace before the first slot', () => {
            store.addDigitToPhoneNumber('1', 0);
            store.setPhoneInputIndex(0);

            store.removeDigitFromPhoneNumber(0, RemoveTarget.prev);

            expect(store.phoneNumberDigits[0]).toBe('1');
            expect(store.phoneInputIndex).toBe(0);
        });

        it('ignores out-of-range removal indexes', () => {
            store.addDigitToPhoneNumber('1', 0);

            store.removeDigitFromPhoneNumber(-1, RemoveTarget.this);
            store.removeDigitFromPhoneNumber(DEFAULT_COUNTRY.digits, RemoveTarget.this);

            expect(store.phoneNumberDigits[0]).toBe('1');
        });
    });

    describe('helpers and derived state', () => {
        it('returns digits in input order', () => {
            const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

            digits.forEach((digit, index) => {
                store.addDigitToPhoneNumber(digit, index);
            });

            expect(store.phoneNumberDigits).toEqual(digits);
        });

        it('maps mask indexes to input indexes only for digit slots', () => {
            const digitMaskIndexes = getMaskDigitIndexes(DEFAULT_COUNTRY.mask);

            expect(store.getInputIndexByMaskIndex(0)).toBeNull();

            digitMaskIndexes.forEach((maskIndex, inputIndex) => {
                expect(store.getInputIndexByMaskIndex(maskIndex)).toBe(inputIndex);
            });
        });

        it('returns a digit by mask index only for digit segments', () => {
            store.addDigitToPhoneNumber('7', 0);
            const firstDigitMaskIndex = getMaskDigitIndexes(DEFAULT_COUNTRY.mask)[0];

            expect(store.getDigitByMaskIndex(0)).toBeUndefined();
            expect(store.getDigitByMaskIndex(firstDigitMaskIndex)).toBe('7');
        });

        it('sets phone input index only within the allowed range', () => {
            store.setPhoneInputIndex(3);
            expect(store.phoneInputIndex).toBe(3);

            store.setPhoneInputIndex(-1);
            expect(store.phoneInputIndex).toBe(3);

            store.setPhoneInputIndex(DEFAULT_COUNTRY.digits);
            expect(store.phoneInputIndex).toBe(3);

            store.setPhoneInputIndex(null);
            expect(store.phoneInputIndex).toBeNull();
        });
    });

    describe('validation and reset', () => {
        it('marks an incomplete number as invalid', () => {
            store.validate();

            expect(store.error).toBe(Text.validatePhone.error());
            expect(store.isValid).toBe(false);
        });

        it('keeps a fully entered numeric phone number valid', () => {
            const digits = ['9', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

            digits.forEach((digit, index) => {
                store.addDigitToPhoneNumber(digit, index);
            });

            store.validate();

            expect(store.error).toBeNull();
            expect(store.isValid).toBe(true);
        });

        it('clears validation state with resetValidation', () => {
            store.validate();
            expect(store.isValid).toBe(false);

            store.resetValidation();

            expect(store.error).toBeNull();
            expect(store.isValid).toBe(true);
        });

        it('fully resets digits, focus, and validation state with reset', () => {
            store.addDigitToPhoneNumber('1', 0);
            store.setPhoneInputIndex(1);
            store.validate();

            store.reset();

            expect(store.phoneNumberDigits).toEqual(new Array(DEFAULT_COUNTRY.digits).fill(''));
            expect(store.phoneInputIndex).toBeNull();
            expect(store.error).toBeNull();
            expect(store.isValid).toBe(true);
        });
    });
});
