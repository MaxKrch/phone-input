import { action, computed, makeObservable, observable } from "mobx";
import { countries, Country, CountryKey, DEFAULT_COUNTRY } from "shared/entities/countries";
import { DEFAULT_COUNTRY_KEY } from "shared/entities/countries";
import { validatePhone, sanitizePhoneNumber } from "shared/utils";

type PrivateFields = 
    | '_keySelectedCountry'
    | '_phoneNumber'
    | '_error'

export default class PhoneInputStore {
    readonly countries: Map<CountryKey, Country>;
    _keySelectedCountry: CountryKey = DEFAULT_COUNTRY_KEY;
    _phoneNumber: string = '';
    _error: string | null = null;

    constructor() {
        makeObservable<PhoneInputStore, PrivateFields>(this, {
            _keySelectedCountry: observable,
            _phoneNumber: observable,
            _error: observable,

            keySelectedCountry: computed,
            selectedCountry: computed,
            phoneNumber: computed,
            phoneNumberWithPrefix: computed,
            error: computed,
            isValid: computed,

            changeKeySelectedCountry: action,
            changePhoneNumber: action,
            validate: action,
            resetValidation: action,
            reset: action,
        });

        this.countries = this.normalizeCountries(countries);
    }

    get keySelectedCountry(): CountryKey {
        return this._keySelectedCountry;
    }

    get selectedCountry(): Country {
        return this.countries.get(this._keySelectedCountry) ?? DEFAULT_COUNTRY;
    }

    get phoneNumber(): string {
        return this._phoneNumber;
    }

    get phoneNumberWithPrefix(): string {
        return this.selectedCountry.prefix + this.phoneNumber;
    }

    get error(): string | null {
        return this._error;
    }

    get isValid(): boolean {
        return this._error === null;
    }

    isValidCountryKey(key: string): key is CountryKey {
        return this.countries.has(key as CountryKey);
    }

    changeKeySelectedCountry(key: CountryKey): void {
        if (!this.countries.has(key)) {
            return;
        }
        this.reset();
        this._keySelectedCountry = key;
    }

    changePhoneNumber(phoneNumber: string): void {
        this._phoneNumber = sanitizePhoneNumber(phoneNumber);
    }

    validate(): void {
        this._error = validatePhone(this._phoneNumber, this.selectedCountry);
    }

    resetValidation(): void {
        this._error = null;
    }

    reset(): void {
        this._phoneNumber = '';
        this.resetValidation();
    }

    private normalizeCountries(countries: readonly Country[]): Map<CountryKey, Country> {
        return new Map(countries.map((country) => [country.key, country]));
    }
}
