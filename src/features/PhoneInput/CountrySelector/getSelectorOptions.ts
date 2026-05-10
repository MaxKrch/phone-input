import { Country } from "shared/entities/countries";
import { SelectorOption } from "shared/entities/selector";

export const getSelectorOptions = (countries: Country[]): SelectorOption[] => {
    return countries.map((country) => ({
        key: country.key,
        value: country.name,
        icon: country.emoji,
    }));
}