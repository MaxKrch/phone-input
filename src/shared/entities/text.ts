export const Text = {
    title: () => `Введите номер телефона`,
    validatePhone: {
        error: () => `Неправильный номер телефона`,
        success: () => `Номер телефона введен верно`,
    },
    callStoreWithoutContext: (name: string) => `Store ${name} вызван вне контекста`,
    phoneInputStore: {
        title: `PhoneInput`
    },
} as const;

