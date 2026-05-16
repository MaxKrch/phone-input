export const Text = {
    title: () => `Введите номер телефона`,
    validatePhone: {
        error: () => `Неправильный номер телефона`,
        success: () => `Номер телефона введен верно`,
    },
    countryField: {
        placeholder: () => `Выберите страну`,
    },
    callStoreWithoutContext: (name: string) => `Store ${name} вызван вне контекста`,
    phoneInputStore: {
        title: `PhoneInput`
    },
} as const;

