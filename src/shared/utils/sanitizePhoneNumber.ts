export const sanitizePhoneNumber = (phoneNumber: string): string => {
    return phoneNumber.replace(/\D/g, '');
}