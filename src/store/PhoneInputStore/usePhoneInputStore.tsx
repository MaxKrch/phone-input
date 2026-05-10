import React from "react";
import { PhoneInputContext } from './PhoneInputProvider';
import PhoneInputStore from "./PhoneInputStore";
import { Text } from "shared/entities/text";

export const usePhoneInputStore = (): PhoneInputStore => {
    const store = React.useContext(PhoneInputContext);
    if (!store) {
        throw new Error(
            Text.callStoreWithoutContext(Text.phoneInputStore.title)
        );
    }
    return store;
}