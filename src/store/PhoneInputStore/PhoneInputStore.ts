import { action, computed, makeObservable, observable } from "mobx";
import { RemoveTarget } from "shared/entities/common";
import { countries, Country, CountryKey, DEFAULT_COUNTRY, MASK_DIGIT_ALIAS } from "shared/entities/countries";
import { DEFAULT_COUNTRY_KEY } from "shared/entities/countries";
import { isDigitSegment, MaskSegment, maskSegmentKind } from "shared/entities/phoneNumber";
import { isDigit, validatePhone } from "shared/utils";

type PrivateFields = 
    | '_keySelectedCountry'
    | '_phoneInputIndex'
    | '_phoneNumberSegments'
    | '_error'

export default class PhoneInputStore {
    readonly countries: Map<CountryKey, Country>;
    _keySelectedCountry: CountryKey = DEFAULT_COUNTRY_KEY;
    _phoneNumberSegments: MaskSegment[] = [];
    _error: string | null = null;
    _phoneInputIndex: number | null = null;

    constructor() {
        makeObservable<PhoneInputStore, PrivateFields>(this, {
            _keySelectedCountry: observable,
            _phoneNumberSegments: observable,
            _phoneInputIndex: observable,
            _error: observable,

            phoneNumberDigits: computed,
            selectedCountry: computed,
            error: computed,
            isValid: computed,
            digitSlotCount: computed,
            phoneInputIndex: computed,
            maskArray: computed,    

            changeKeySelectedCountry: action,
            addDigitToPhoneNumber: action,
            removeDigitFromPhoneNumber: action,
            setPhoneInputIndex: action,
            validate: action,
            resetValidation: action,
            reset: action,
        });

        this.countries = this.normalizeCountries(countries);
        this.rebuildPhoneNumberSegments(this.selectedCountry.mask);
    }

    get keySelectedCountry(): CountryKey {
        return this._keySelectedCountry;
    }

    get selectedCountry(): Country {
        return this.countries.get(this._keySelectedCountry) ?? DEFAULT_COUNTRY;
    }

    get error(): string | null {
        return this._error;
    }

    get isValid(): boolean {
        return this._error === null;
    }

    get phoneInputIndex(): number | null {
        return this._phoneInputIndex;
    }

    get digitSlotCount(): number {
        return this.selectedCountry.digits;
    }

    get maskArray(): string[] {
        return this.selectedCountry.mask.split('');
    }

    get phoneNumberDigits(): string[] {
        return this._phoneNumberSegments.filter(isDigitSegment).map((segment) => segment.value);
    }

    getDigitByMaskIndex(index: number): string | undefined {
        const segment = this._phoneNumberSegments[index];
        if (segment && isDigitSegment(segment)) {
            return segment.value;
        }
        return undefined;
    }

    getDigitByInputIndex(index: number): string | undefined {
        return this.phoneNumberDigits[index];
    }

    getInputIndexByMaskIndex(index: number): number | null {
        const segment = this._phoneNumberSegments[index];
       
        if (isDigitSegment(segment)) {
            return segment.inputIndex;
        }
        return null;
    }

    isValidCountryKey(key: string): key is CountryKey {
        return this.countries.has(key as CountryKey);
    }

    changeKeySelectedCountry(key: CountryKey): void {
        if (!this.countries.has(key)) {
            return;
        }
        this._keySelectedCountry = key;
        this.reset();
    }

    addDigitToPhoneNumber(number: string, inputIndex: number): void {
        if (inputIndex < 0 || inputIndex >= this.digitSlotCount) {
            return;
        }

        if (!isDigit(number)) {
            return;
        }

        const digits = this.getDigitsCopy();
        digits[inputIndex] = number;
        this.applyDigitsToSegments(digits);

        if (inputIndex < this.digitSlotCount - 1) {
            this.setPhoneInputIndex(inputIndex + 1);
        }
    }

    removeDigitFromPhoneNumber(inputIndex: number, target: RemoveTarget): void {
        if (inputIndex < 0 || inputIndex >= this.digitSlotCount) {
            return;
        }

        const clearIndex = target === RemoveTarget.prev ? inputIndex - 1 : inputIndex;
        if (clearIndex < 0 || clearIndex >= this.digitSlotCount) {
            return;
        }

        const digits = this.getDigitsCopy();
        for (let i = clearIndex; i < this.digitSlotCount - 1; i++) {
            digits[i] = digits[i + 1];
        }
        digits[this.digitSlotCount - 1] = '';
        this.applyDigitsToSegments(digits);

        if (target === RemoveTarget.prev) {
            this.setPhoneInputIndex(clearIndex);
        }
    }

    setPhoneInputIndex(index: number | null): void {
        if (index !== null && (index < 0 || index >= this.digitSlotCount)) {
            return;
        }

        this._phoneInputIndex = index;
    }

    validate(): void {
        this._error = validatePhone(this.phoneNumberDigits.join(''), this.selectedCountry);
    }

    resetValidation(): void {
        this._error = null;
    }

    reset(): void {
        this._phoneInputIndex = null;
        this.rebuildPhoneNumberSegments(this.selectedCountry.mask);
        this.resetValidation();
    }

    private normalizeCountries(countries: readonly Country[]): Map<CountryKey, Country> {
        return new Map(countries.map((country) => [country.key, country]));
    }

    private getDigitsCopy(): string[] {
        const digits = this.phoneNumberDigits;
        const copy = new Array<string>(this.digitSlotCount).fill('');

        for (let i = 0; i < this.digitSlotCount; i++) {
            copy[i] = digits[i];
        }

        return copy;
    }

    private applyDigitsToSegments(digits: string[]): void {
        this._phoneNumberSegments = this._phoneNumberSegments.map((segment) =>
            isDigitSegment(segment)
                ? { ...segment, value: digits[segment.inputIndex] }
                : segment,
        );
    }

    private rebuildPhoneNumberSegments(mask: string): void {
        let inputIndex = 0;
        
        this._phoneNumberSegments = mask.split('').map((char, index) => {
            if (char === MASK_DIGIT_ALIAS) {
                const currentInputIndex = inputIndex;
                inputIndex += 1;
                return { 
                    kind: maskSegmentKind.digit, 
                    maskIndex: index, 
                    inputIndex: currentInputIndex, 
                    value: '' 
                };
            }
            return { 
                kind: maskSegmentKind.char, 
                maskIndex: index, 
                value: char 
            };
        });
    }
}
