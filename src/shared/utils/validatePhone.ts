import { Country } from "shared/entities/countries";
import { Text } from "shared/entities/text";

export const validatePhone = (phoneNumber: string, country: Country): string | null => {
    const isDigitsValid = phoneNumber.length === country.digits;
    if (!isDigitsValid) {
        return Text.validatePhone.error();
    }
    return null;
}