import React from 'react';
import PhoneInputStore from "./PhoneInputStore";
import useLocalStore from 'shared/hooks/useLocalStore';

export const PhoneInputContext = React.createContext<PhoneInputStore | null>(null);

export const PhoneInputProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const store = useLocalStore(() => new PhoneInputStore());
    return (
        <PhoneInputContext.Provider value={ store }>
            {children}
        </PhoneInputContext.Provider>
    )
}

export default PhoneInputProvider;