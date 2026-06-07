import { RemoveTarget } from "shared/entities/common";
import PhoneInputStore from "store/PhoneInputStore";
import { isDigit } from "shared/utils";
import React from "react";

type Props = {
    store: PhoneInputStore;
    onPressEnter?: () => void;
    onChange?: () => void;
}

const useKeyDownInput = ({
    store,
    onPressEnter,
    onChange,
}: Props) => {
    const addDigitToPhoneNumber = React.useCallback((event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        event.preventDefault();
        
        const key = event.key;
        if (!isDigit(key)) {
            return;
        }
        store.addDigitToPhoneNumber(key, index);
        onChange?.();
    }, [store, onChange]);
    
    const isStartInputPosition = React.useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        return event.currentTarget.selectionStart === 0;       
    }, []);

    const isEndInputPosition = React.useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        return event.currentTarget.selectionEnd === event.currentTarget.value.length;
    }, []);

    const handleKeyDown = React.useCallback((index: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
        switch(event.key) {
            case 'Backspace': {
                event.preventDefault();
                store.removeDigitFromPhoneNumber(
                    index, 
                    isStartInputPosition(event) 
                        ? RemoveTarget.prev 
                        : RemoveTarget.this
                );
                onChange?.();
                break;
            }
            
            case 'Delete': {
                event.preventDefault();
                store.removeDigitFromPhoneNumber(
                    index, 
                    isStartInputPosition(event) 
                        ? RemoveTarget.this 
                        : RemoveTarget.next
                    );
                onChange?.();
                break;
            }

            case 'Enter': {
                event.preventDefault();
                onPressEnter?.();
                break;
            }

            case 'ArrowLeft': {
                
                    event.preventDefault();
                    store.setPhoneInputIndex(index - 1);
                
                break;
            }

            case 'ArrowRight': {
           
                    event.preventDefault();
                    store.setPhoneInputIndex(index + 1);
                
                break;
            }

            default:
                addDigitToPhoneNumber(event, index);
                break;
        }
    }, [store, addDigitToPhoneNumber, onPressEnter, onChange]);

    return { handleKeyDown };
}

export default useKeyDownInput;