import React from 'react';

export const useLocalStore = <T>(storeCreator: () => T): T => {
    const storeRef = React.useRef< T | null>(null);

    if (!storeRef.current) {
        storeRef.current = storeCreator();
      }

    return storeRef.current;
}

export default useLocalStore;