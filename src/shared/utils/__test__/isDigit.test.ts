import { isDigits } from '../isDigit';

describe('isDigits', () => {
    it('returns true for a numeric string', () => {
        expect(isDigits('12345')).toBe(true);
    });

    it('returns true for zero', () => {
        expect(isDigits('0')).toBe(true);
    });

    it('returns false for a non-numeric string', () => {
        expect(isDigits('abc')).toBe(false);
    });

    it('returns false for a string that starts with a digit and then contains a letter', () => {
        expect(isDigits('1a')).toBe(false);
    });

    it('returns false for an empty string', () => {
        expect(isDigits('')).toBe(false);
    });
});
