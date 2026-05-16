export const isDigit = (key: string): boolean => {
    return /^\d$/.test(key);
}

export const isDigits = (phoneNumber: string): boolean => {
    return /^\d+$/.test(phoneNumber);
}